
const counter=(search:string,source:string)=>
{
    let re= new RegExp(search,'g');
    return (source.match(re) || []).length;
}


/**
 *
 * @param side
 * @param pieceSet . in this peaceset, onHandpieces looks like 'sgSg', meaning Sente, column 'g', row 'S' and piece 'g'
 */
export const scoreArray=(side:string,pieceSet:string)=>{
    const pieces='plnsgbr'.split('').map((piece)=>{
        const search=side+piece+side.toUpperCase()+piece
        return piece+counter(search,pieceSet)
    })
    return pieces
}

export const unifyPieces=(senteOnBoard:string,goteOnBoard:string,senteOnHand:string,goteOnHand:string)=>{
    console.log('unified pieces called')
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

export const preProcessMoves=((moves:string[]|string)=> {
    console.log('preProcess moves called')
    let prevMove=''
    let movesArray;
    if (typeof moves==="string") {movesArray=moves.split(',')} else {movesArray=moves}
    movesArray=movesArray.map((e,index)=>{
      let t=e.trim()
        if (t[2] && t[2].toLowerCase()==='x') return 'x'
        if (t.slice(2,4)==='00') t=t.replace('00',prevMove)
        prevMove=t.slice(2,4)
        return t
    })
    return movesArray
})
