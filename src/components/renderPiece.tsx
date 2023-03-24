const pngNames = ['fu', 'to', 'kyo', 'nkyo', 'kei', 'nkei', 'gin', 'ngin', 'kin', 'kaku', 'uma', 'hi', 'ryu', 'ou']
const codeNames = 'pPlLnNsSgbBrRk' //code representation of each shogi piece


/**
 *
 * @param prop  {piece:string} is   spcr,  side, piece, column, row. for example, 'g82r', 'g93p',
 * 'gpGp' for Gote, column position pawn, row position Gote(onHand area), and piece is pwn
 * @constructor
 */
export const RenderPiece=(prop:{piece:string,mover:string,animate:boolean ,koma:string})=>{
   //side need to be capital
    const {piece, mover:inPlay, animate,koma}=prop
    const pngName = piece[0].toUpperCase()+pngNames[codeNames.indexOf(piece[3])]
    const animateClass=(animate)?' animate-move':'';
    const moveClass=(inPlay===piece.slice(1,3))?' onMove':'';
    const classes = `koma c${piece[1]} r${piece[2]}${moveClass}${animateClass}`


    const pieceImage = `${koma}/${pngName}.png`
    return <img src={pieceImage} class={classes} alt=""/>
}

export const RenderBoard=(Props:{ban:string,grid:string})=>(
    <>
        <img class="board" src={Props.ban}
             alt=""/>
        <img class="board" src={Props.grid}
             alt=""/>

    </>
)

export const MarkerAt = (Props: { c: string, r: string, marker:string }) => {
    const classes = `marker c${Props.c} r${Props.r}`
    return (<img class={classes} src={Props.marker} alt=""/>)
}