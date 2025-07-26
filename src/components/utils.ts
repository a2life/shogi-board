import {convertStringToMoveObject} from "./convertStringToMoveObject";

const counter = (search: string, source: string) => {
    let re = new RegExp(search, 'g');
    return (source.match(re) || []).length;
}

//const sente = "▲"
//const gote = "△"
const sente = '☗'; //&#x2617;
const gote = '☖' //&#x2616;
/**
 *
 * @param side
 * @param pieceSet . in this peaceSet, onHandPieces looks like 'sgSg', meaning Sente, column 'g', row 'S' and piece 'g'
 */
export const scoreArray = (side: string, pieceSet: string) => {
    return 'plnsgbr'.split('').map((piece) => {
        const search = side + piece + side.toUpperCase() + piece
        return piece + counter(search, pieceSet)
    })

}
// unify pieces. first, check for empty string, then prepare and return string
export const unifyPieces = (senteOnBoard: string, goteOnBoard: string, senteOnHand: string, goteOnHand: string) => {
    const sbp = senteOnBoard === '' ? [] : senteOnBoard.split(',').map((piece) => 's' + piece)
    const gbp = goteOnBoard === '' ? [] : goteOnBoard.split(',').map((piece) => 'g' + piece)
    let sof = senteOnHand.split(',').map((a) => duplicateLetter(a)).toString()
    const sop = sof === '' ? [] : sof.split(',').map((piece) => 's' + piece + 'S' + piece)
    let gof = goteOnHand.split(',').map((a) => duplicateLetter(a)).toString()
    const gop = gof === '' ? [] : gof.split(',').map((piece) => 'g' + piece + 'G' + piece)
    return [...sbp, ...gbp, ...sop, ...gop].toString()
}
const duplicateLetter = (a: string) => {
    let s = []
    const qty = (!!a[1]) ? parseInt(a.slice(1)) : 1
    for (let count = 0; count < qty; count++) s.push(a[0])
    return s.toString();
}
const rePattern = new RegExp('^(?<pre>[sgCxX])[\\-+0-9a-z]+((?<branch>[J=])(?<move>\\d+))?:?(?<Note>[一二三四五六七八九１-９　歩と香杏成桂圭銀全金角馬飛竜龍玉王投了同直左右引打上下寄行不]*)\\*?(.*)')
// const brPattern = new RegExp('J(\\d\\d)')
// (?<name>regex expression) => Named captured group

export const isMoveObject = (obj: unknown): obj is MoveObject => (obj as MoveObject).move !== undefined

export const isStringArray = (array: unknown[]): array is string[] => array.every((element) => typeof element === 'string');

//export const isMoveObjectArray = (array: unknown[]): array is MoveObject[] => array.every((element) => isMoveObject(element));


export const preProcessMoves = (moves: string | string[] | MoveObject[]) => {
    if (typeof moves === 'string') {
        moves = moves.split(',')
    }
    // moves is either string[] or MoveObject[]

    if (isStringArray(moves)) {
        moves = convertStringToMoveObject(moves)

    }
    const lineZeroComment = moves[0].comment ?? ''
    if (moves.length > 0) {
        moves = moves.map(e => {
            return {...e, move: e.move.trim()}
        })
        moves.splice(0, 1) //rem
    }

    return {movesArray: moves.map((e,i)=>{return {...e,step:i}}), lineZeroComment: lineZeroComment};
}


const getBranchArray = (movesArray: MoveObject[]) => {

    return movesArray.map((e, index) => ({
        marker: e.move.trim(),
        index: index
    })).filter((e) => (e.marker.includes('C:')))
        .map((e) => ({marker: e.marker.replace(/C:(\d+).*/, '$1'), index: e.index}))


}

/**
 *  return Notes {note:string, counter:number}[] note is like ;８五歩
 * @param index --move index
 * @param movementArray -- array of moves
 */
export const movementNotBranch = (index: number, movementArray: MoveObject[]): boolean => {
    let beachheadCheck
    let param

    beachheadCheck = (movementArray[index - 1].move.slice(0, 1) !== 'C')
    param = (movementArray[index].move).match(rePattern)


    const isNotBranchHead = (index == 0) ? true : beachheadCheck


    return (param?.groups?.branch !== 'J') && isNotBranchHead
}

const symbolizeSide = (side: string) => (side === 's') ? sente : gote;

export const prepBranchPoints = (movesArray: MoveObject[]) => {
    // go through movesArray

    const branches = getBranchArray(movesArray)
    //console.log('branches:',branches)
    // if j is found and index-1 does not start with 'branchHead'(i.e., 'C'),
    const resultArray = movesArray.map((e, i) => {

        return {move: e, index: i}

    }).filter((e, index) => {
        const moveComponents = e.move.move.match(rePattern)
        return ((moveComponents?.groups?.branch === 'J') && ((index === 0) || ((movesArray[index - 1] as MoveObject).move[0] !== 'C')))


    })
    //console.log('resultArray',resultArray)
    // call nexMoveNote, store the returned value with index.
    const NotesArray = resultArray.map(e => {
        const Note = []
        let j = 0
        let pointer = e.index
        let movement = e.move.move

        let moveElements = movement.match(rePattern) as RegExpMatchArray
        Note.push({note: symbolizeSide(moveElements.groups!.pre) + moveElements.groups!.Note, index: pointer}) //store first selection
        do {
            const branchNumber = moveElements.groups!.move //then remember jump number
            while (branches[j].index < pointer) {
                j = j + 1;
            }   // using branches' array but move passed the current counter's position
            while (branches[j].marker !== branchNumber) j++  //move up to matching branch number
            pointer = branches[j].index + 1;
            movement = movesArray[pointer].move
            moveElements = movement.match(rePattern) as RegExpMatchArray

            Note.push({note: symbolizeSide(moveElements.groups!.pre) + moveElements.groups!.Note, index: pointer}) //store first selection

        } while (moveElements.groups!.branch === 'J')
        return Note
    })

    //  set up branch node with index, so if counter is at index, looking up this array will return branch options.
    //  like { index: [{index:index, movement:movement}, , ,]}
    let branchIndicators = {} as any
    NotesArray.forEach((branch: { note: string, index: number }[]) => {
        branch.forEach((leave) => {
            const pointer = leave.index.toString()
            branchIndicators[pointer] = branch;
        })
    })

    // return this array
    return branchIndicators

}

export const getMoveNote = (movement:  MoveObject) => {
    if (!movement) return ''
    let thisMovement = movement.move
    let moveElements = thisMovement.match(rePattern)
    if (!moveElements) return ``
    if (typeof (moveElements.groups) != 'undefined') {
        if (moveElements.groups.move === undefined) {
            return symbolizeSide(moveElements.groups.pre) + moveElements.groups.Note
        } //if a readable move is not included in the move string, then return an empty string
        else return moveElements.groups!.move + '.' + symbolizeSide(moveElements.groups!.pre) + moveElements.groups!.Note
    } else return ''
}
export const displayWithSideSymbol = (side: 's' | 'g', name: string) => symbolizeSide(side) + name
/**
 * return comment as string
 * @param moveLine
 */
export const extractComments = (moveLine: MoveObject): string => moveLine.comment ?? ''

export const lineBreakComments = (comment: string): string => {
    if (comment)
      //  return comment.replace(/[=*]{6}/g, '\n')
        return comment.replace('\n','<br>')
    else return "";
}


export const addExtension = (target: string, extension: string) => {
    if (target.slice(-extension.length) == extension) {
        return target
    } else return target + extension
}