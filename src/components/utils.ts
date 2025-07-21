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

export const isMoveObject=(obj:unknown):obj is MoveObject=> (obj as MoveObject).move !== undefined

export const isStringArray=(array: unknown[]): array is string[]=>  array.every((element) => typeof element === 'string');

export const isMoveObjectArray=(array: unknown[]): array is MoveObject[]=> array.every((element) => isMoveObject(element));




const convertMovesToMovesObjectArray = (moves: string | string[]) => {
    let movesArray = moves;
    if (typeof movesArray === 'string') {
        movesArray = movesArray.split(',')
    }
    return (movesArray as string[]).map(i => {
        return {move: i}
    }) as MoveObject[];
}
export const preProcessMoves = (moves: string[] | string | MoveObject[]) => {
    let movesArray: string[] | MoveObject[];
    let movesPartArray: string[]
    let lineZeroComment = '';
    if (typeof moves === "string") {
        movesArray = moves.split(',')
        movesPartArray = moves.split(',')
        movesArray = movesPartArray.map(i => {
            return {move: i}
        })
    } else {

        movesArray = moves
    }

    if (movesArray.length > 1) {

        if (isStringArray(movesArray)) {
            //do array mapping for string
            movesArray = movesArray.map((e, index) => {
                    let t = ''
                    t = (e as string).trim()

                 //   if (t[2] && t[2].toLowerCase() === 'x') return 'x'
                    /*if (t.slice(2, 4) == '00') {
                        const prevMove = movesArray[index - 1];
                        if ((prevMove as string)[0] === 'C') {
                            // handling for branch head is to be implemented.
                        } else {
                            t.replace('00', (prevMove as string).slice(2, 4))
                        }
                    }*/
                    return t
                }
            )
            if (movesArray[0][0] === '*') { //if the first line is comment then,
                lineZeroComment = movesArray[0]
                //   console.log('initialComment', initialComment)
                movesArray.splice(0, 1)
            }

        } else if (isMoveObjectArray(movesArray)) {
            //do array mapping for MoveObject
            movesArray = movesArray.map((e, index) => {

                let t = e.move.trim()
              /*  if (t[2] && t[2].toLowerCase() === 'x') {
                    e.move = 'x'
                    return e
                }
                if (t.slice(2, 4) == '00') {
                    const prevMove = movesArray[index - 1];
                    if ((prevMove as MoveObject).move[0] === 'C') {
                        // handling for branch head is to be implemented.
                    } else {
                        t.replace('00', (prevMove as MoveObject).move.slice(2, 4))
                    }
                }*/
                return e


            })
            lineZeroComment = movesArray[0].comment??''
            movesArray.splice(0, 1) //remove first element
        }

    }
    return {movesArray, lineZeroComment}
}


const getBranchArray = (movesArray: string[] | MoveObject[]) => {
    if (isStringArray(movesArray)) {
        return movesArray.map((e, index) => ({
            marker: e,
            index: index
        })).filter((e) => (e.marker.includes('C:')))
            .map((e) => ({marker: e.marker.replace(/C:(\d+).*/, '$1'), index: e.index}))
    }
    if (isMoveObjectArray(movesArray)) {
        return movesArray.map((e, index) => ({
            marker: e.move.trim(),
            index: index
        })).filter((e) => (e.marker.includes('C:')))
            .map((e) => ({marker: e.marker.replace(/C:(\d+).*/, '$1'), index: e.index}))

    } else return []
}

/**
 *  return Notes {note:string, counter:number}[]  note is like ;８五歩'
 * @param index --move index
 * @param movementArray -- array of moves
 */
export const movementNotBranch  = (index: number, movementArray: string[]|MoveObject[] ): boolean =>{
    let beachheadCheck = false
    let param
    if (isStringArray(movementArray)) {
        beachheadCheck = (movementArray[index-1].slice(0, 1) !== 'C')
        param = (movementArray[index]).match(rePattern)
    } else if (isMoveObjectArray(movementArray)) {
        beachheadCheck = (movementArray[index-1].move.slice(0, 1) !== 'C')
        param = (movementArray[index].move).match(rePattern)
    }

    const isNotBranchHead = (index == 0) ? true : beachheadCheck


    return (param?.groups?.branch !== 'J') && isNotBranchHead
}

const symbolizeSide = (side: string) => (side === 's') ? sente : gote;

export const prepBranchPoints = (movesArray: string[] | MoveObject[]) => {
    // go through movesArray

    const branches = getBranchArray(movesArray)
        //console.log('branches:',branches)
    // if j is found and index-1 does not start with 'branchHead'(ie., 'C'),
    const resultArray = movesArray.map((e, i) => {

            return {move: e, index: i}

    }).filter((e, index) => {
        let moveComponents;
        if (typeof e.move === 'string') {
            moveComponents = e.move.match(rePattern) as RegExpMatchArray
            return ((moveComponents?.groups?.branch === 'J') && ((index === 0) || ((movesArray[index - 1] as string)[0] !== 'C')))
        } else {
            moveComponents = e.move.move.match(rePattern)
            return ((moveComponents?.groups?.branch === 'J') && ((index === 0) || ((movesArray[index - 1] as MoveObject).move[0] !== 'C')))
        }

    })
    //console.log('resultArray',resultArray)
    // call nexMoveNote, store the returned value with index.
    const NotesArray = resultArray.map(e => {
        const Note = [] as any
        let j = 0
        let pointer = e.index
        let movement = null
        if (typeof e.move === 'string') {
            movement = e.move
        } else {
            movement = e.move.move
        }
        let moveElements = movement.match(rePattern) as RegExpMatchArray
        Note.push({note: symbolizeSide(moveElements.groups!.pre) + moveElements.groups!.Note, index: pointer}) //store first selection
        do {
            const branchNumber = moveElements.groups!.move //then remember jump number
            while (branches[j].index < pointer) {
                j = j + 1;
            }   // using branches' array but move passed the current counter's position
            while (branches[j].marker !== branchNumber) j++  //move up to matching branch number
            pointer = branches[j].index + 1;
            if (typeof movesArray[pointer] === 'string') {
                movement = movesArray[pointer] as string
            } else {
                movement = (movesArray[pointer] as MoveObject).move
            }

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

export const getMoveNote = (movement: string | MoveObject) => {
    if (!movement) return ''
    let thisMovement = ''
    if (typeof movement === 'string') {
        thisMovement = movement
    } else if (isMoveObject(movement)) {
        thisMovement = movement.move
    }
    let moveElements = thisMovement.match(rePattern)
    if (!moveElements) return ``
    if (typeof (moveElements.groups) != 'undefined') {
        if (moveElements.groups.move === undefined) {
            return symbolizeSide(moveElements.groups.pre) + moveElements.groups.Note
        } //if readable move is not included in move string then return empty string
        else return moveElements.groups!.move + '.' + symbolizeSide(moveElements.groups!.pre) + moveElements.groups!.Note
    } else return ''
}
export const displayWithSideSymbol = (side: 's' | 'g', name: string) => symbolizeSide(side) + name
/**
 * return comment as string
 * @param moveLine
 */
export const extractComments = (moveLine: string | MoveObject):string => {
    let comment = ''
    //console.log('moveLine', moveLine)

    if (typeof moveLine === 'string') {
        const commentArray = moveLine.match(/\*\*\*(.*)\*\*\*/);
        if (commentArray) {
            const trimmedCommentArray = commentArray.map(i => i.slice(3, -3))
            comment = lineBreakComments(trimmedCommentArray[0])
        }
    } else {
        comment = moveLine.comment??comment
    }


    return comment;
    /* const index = (moveLine.indexOf('***'));
     const comment = (index >= 0) ? moveLine.slice(index + 1) : ''
     return comment.replaceAll('*', '<br>')*/
}
export const lineBreakComments = (comment: string ):string => {
    if (comment)
        return comment.replace(/[=*]{6}/g, '\n')
    else return "";
}

export const extractBookMark = (moveLine: string) => {
    const bookMarkArray = moveLine.match(/&&&(.*)&&&/);
    if (bookMarkArray) {
        const trimmedCommentArray = bookMarkArray.map(i => i.slice(3, -3))
        return trimmedCommentArray[0] + '\n'
    }

    return ''
}

export const addExtension = (target: string, extension: string) => {
    if (target.slice(-extension.length) == extension) {
        return target
    } else return target + extension
}