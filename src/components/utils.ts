const counter = (search: string, source: string) => {
    let re = new RegExp(search, 'g');
    return (source.match(re) || []).length;
}

const sente="▲"
const gote="△"

/**
 *
 * @param side
 * @param pieceSet . in this peaceset, onHandpieces looks like 'sgSg', meaning Sente, column 'g', row 'S' and piece 'g'
 */
export const scoreArray = (side: string, pieceSet: string) => {
    const pieces = 'plnsgbr'.split('').map((piece) => {
        const search = side + piece + side.toUpperCase() + piece
        return piece + counter(search, pieceSet)
    })
    return pieces
}

export const unifyPieces = (senteOnBoard: string, goteOnBoard: string, senteOnHand: string, goteOnHand: string) => {
    const sbp = senteOnBoard.split(',').map((piece) => 's' + piece)
    const gbp = goteOnBoard.split(',').map((piece) => 'g' + piece)
    let sof = senteOnHand.split(',').map((a) => duplicateLetter(a)).toString()
    const sop = sof === '' ? [] : sof.split(',').map((piece) => 's' + piece + 'S' + piece)
    let gof = goteOnHand.split(',').map((a) => duplicateLetter(a)).toString()
    const gop = gof === '' ? [] : gof.split(',').map((piece) => 'g' + piece + 'G' + piece)
    return [...sbp, ...gbp, ...sop, ...gop].toString()
}
const duplicateLetter = (a: string) => {
    let s = []
    for (let count = 0; count < parseInt(a[1]); count++) s.push(a[0])
    return s.toString();
}
const rePattern = new RegExp('^(?<pre>[sgC*xX])[\\-\\+0-9a-z]+((?<branch>[J=])(?<move>\\d+))?:?(?<Note>[一二三四五六七八九１-９　歩と香成桂銀金角馬飛竜玉王投了同直左右引打上寄]*)\\*?(.*)')
const brPattern = new RegExp('J(\\d\\d)')


export const preProcessMoves = ((moves: string[] | string) => {
    let prevMove = ''
    let movesArray;
    let initialComment;
    if (typeof moves === "string") {
        movesArray = moves.split(',')
    } else {
        movesArray = moves
    }
    movesArray = movesArray.map((e, index) => {
        let t = e.trim()
        if (t[2] && t[2].toLowerCase() === 'x') return 'x'
        if (t.slice(2, 4) === '00') t = t.replace('00', prevMove)
        prevMove = t.slice(2, 4)
        return t
    })
    if (movesArray[0][0] === '*') { //if the first line is comment then,
        initialComment = `${initialComment} ${movesArray[0].slice(1)}`
        //   console.log('initialComment', initialComment)
        movesArray.splice(0, 1)
    }
    const branchMarkers = movesArray.map((e, index) => ({
        marker: e,
        index: index
    })).filter((e) => (e.marker.indexOf('C:') !== -1))
        .map((e) => ({marker: e.marker.slice(2, 4), index: e.index}))
    console.log('branchMarkers', branchMarkers)
    return {plays: movesArray, branches: branchMarkers,initialComment:initialComment}
})


/**
 *  return Notes {note:string, counter:number}[]  note is like ;８五歩' couner is move index.
 * @param counter --move index
 * @param movesArray -- array of moves
 * @param branches -- array indicating branches
 */

export const movementIsNotBranch=(move:string)=>{
    const param=move.match(rePattern);
    return param?.groups?.branch!=='J'
}

export const nextMoveNote = (counter: number, movesArray: string[], branches:{marker:string,index:number}[]) => {
    const Note = [] as any
    let j = 0
    let movement = movesArray[counter]
    console.log('movement', movement)
    let moveElements = movement.match(rePattern) as RegExpMatchArray
    console.log('moveElements', moveElements)
    if (moveElements?.groups?.branch === 'J') {//if branch move is detected
        Note.push({note: moveElements.groups!.pre+moveElements.groups!.Note, counter: counter}) //store first selection
        do {
            const branchNumber = moveElements.groups!.move //then remember jump number
            while (branches[j].index < counter) {
                j=j+1;
            }   // using branches array but move passed the current counter position
            while (branches[j].marker !== branchNumber) j++  //move up to matching branch number
            counter = branches[j].index + 1;
            movement = movesArray[counter]
            moveElements = movement.match(rePattern) as RegExpMatchArray
            Note.push({note: moveElements.groups!.pre+moveElements.groups!.Note, counter: counter}) //store first selection

        } while (moveElements.groups!.branch === 'J')
    }

    return Note;
}
