
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


export const preProcessMoves = (moves: string[] | string) => {
    let movesArray: string[];
    let lineZeroComment = '';
    if (typeof moves === "string") {
        movesArray = moves.split(',')
    } else {
        movesArray = moves
    }
    if (movesArray.length>1) {
        movesArray = movesArray.map((e, index) => {
            let t = e.trim()
            if (t[2] && t[2].toLowerCase() === 'x') return 'x'
            if (t.slice(2, 4) == '00') {
                const prevMove = movesArray[index - 1];
                if (prevMove[0] === 'C') {
                    // handling for branch head is to be implemented.
                } else {
                    t.replace('00', prevMove.slice(2, 4))
                }
            }
            return t
        })
        if (movesArray[0][0] === '*') { //if the first line is comment then,
            lineZeroComment = movesArray[0]
            //   console.log('initialComment', initialComment)
            movesArray.splice(0, 1)
        }

    }

    return {movesArray, lineZeroComment}
}


const getBranchArray = (movesArray: string[]) => movesArray.map((e, index) => ({
    marker: e,
    index: index
})).filter((e) => (e.marker.indexOf('C:') !== -1))
    .map((e) => ({marker: e.marker.replace(/C:(\d+).*/, '$1'), index: e.index}))


/**
 *  return Notes {note:string, counter:number}[]  note is like ;８五歩'
 * @param index --move index
 * @param movementArray -- array of moves
 */
export const movementNotBranch = (index: number, movementArray: string[]|MovesObject[]) => {
    const thisMovement = movementArray[index];
    const previousLine =movementArray[index-1];
    let branchHeadCheck=false
    let param
    if (typeof previousLine==='string') {
        branchHeadCheck=(previousLine.slice(0,1)!=='C')
         param = (thisMovement as string).match(rePattern)
    } else
        if (typeof previousLine === 'object') {
            branchHeadCheck=(previousLine.move.slice(0,1)!=='C')
            param = ((thisMovement as MovesObject).move).match(rePattern)
        }

    const isNotBranchHead = (index == 0) ? true : branchHeadCheck


    return (param?.groups?.branch !== 'J') && isNotBranchHead
}

const symbolizeSide = (side: string) => (side === 's') ? sente : gote;

export const prepBranchPoints = (movesArray: string[]) => {
    // go through movesArray
    const branches = getBranchArray(movesArray)
    //  console.log('branches:',branches)
    // if j is found and index-1 does not start with 'branchHead'(ie., 'C'),
    const resultArray = movesArray.map((e, i) => {
        return {move: e, index: i}
    }).filter((e, index) => {

        let moveComponents = e.move.match(rePattern) as RegExpMatchArray
        return ((moveComponents?.groups?.branch === 'J') && ((index === 0) || (movesArray[index - 1][0] !== 'C')))
    })
    // call nexMoveNote, store the returned value with index.
    const NotesArray = resultArray.map(e => {
        const Note = [] as any
        let j = 0
        let pointer = e.index
        let movement = e.move
        let moveElements = movement.match(rePattern) as RegExpMatchArray
        Note.push({note: symbolizeSide(moveElements.groups!.pre) + moveElements.groups!.Note, index: pointer}) //store first selection
        do {
            const branchNumber = moveElements.groups!.move //then remember jump number
            while (branches[j].index < pointer) {
                j = j + 1;
            }   // using branches array but move passed the current counter position
            while (branches[j].marker !== branchNumber) j++  //move up to matching branch number
            pointer = branches[j].index + 1;
            movement = movesArray[pointer]
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

export const getMoveNote = (movement: string|MovesObject) => {
    if (!movement) return null
    let thisMovement=''
    if(typeof movement === 'string') { thisMovement = movement }
    else  if (typeof movement === 'object') { thisMovement = movement.move }
     let moveElements = thisMovement.match(rePattern) as RegExpMatchArray
    if(!moveElements) return null
    if (typeof(moveElements.groups)!='undefined') {
        if (moveElements.groups.move === undefined) {
            return symbolizeSide(moveElements.groups.pre) + moveElements.groups.Note
        } //if readable move is not included in move string then return nothing
        else return moveElements.groups!.move + '.' + symbolizeSide(moveElements.groups!.pre) + moveElements.groups!.Note
    }
    else return
}
export const displayWithSideSymbol = (side: 's' | 'g', name: string) => symbolizeSide(side) + name

export const extractComments = (moveLine: string|MovesObject) => {
    let comment = ''

    if (typeof moveLine === 'string') {
        const commentArray = moveLine.match(/\*\*\*(.*)\*\*\*/);
        if (commentArray) {
            const trimmedCommentArray = commentArray.map(i => i.slice(3, -3))
            comment = lineBreakComments(trimmedCommentArray[0])
        }
    }
    else if (typeof moveLine === 'object') {
        comment =moveLine.comment!
    }


    return comment;
    /* const index = (moveLine.indexOf('***'));
     const comment = (index >= 0) ? moveLine.slice(index + 1) : ''
     return comment.replaceAll('*', '<br>')*/
}
export const lineBreakComments = (comment: string|undefined) => {
    if (comment)
    return comment.replace(/[=*]{6}/g, '\n')
    else return "";
}

export const extractBookMark = (moveLine: string) => {
    const commentArray = moveLine.match(/&&&(.*)&&&/);
    if (commentArray) {
        const trimmedCommentArray = commentArray.map(i => i.slice(3, -3))
        return trimmedCommentArray[0] + '\n'
    }

    return ''
}

export const addExtension=(target:string, extension:string)=>{
    if (target.slice(-extension.length)==extension){
        return target
    }
    else return target+extension
}