const pngNames = ['fu', 'to', 'kyo', 'nkyo', 'kei', 'nkei', 'gin', 'ngin', 'kin', 'kaku', 'uma', 'hi', 'ryu', 'ou']
const codeNames = 'pPlLnNsSgbBrRk' //code representation of each shogi piece


const imgRoot = '/assets/img/'
const banImage = imgRoot + "ban/ban_kaya_a.png"
const gridImage = imgRoot + 'masu/masu_dot_xy.png'
const markerImg = imgRoot + 'focus/focus_trpt_g.png'
const komaSelection = 'koma_ryoko_1'



/**
 *
 * @param prop  {piece:string} is   spcr,  side, piece, column, row. for example, 'g82r', 'g93p',
 * 'gpGp' for Gote, column position pawn, row position Gote(onHand area), and piece is pwn
 * @constructor
 */
export const RenderPiece=(prop:{piece:string,mover:string})=>{
   //side need to be capital
    const piece=prop.piece
    const mover=prop.mover

    const pngName = piece[0].toUpperCase()+pngNames[codeNames.indexOf(piece[3])]
    const classes = `koma c${piece[1]} r${piece[2]} ${(mover===piece.slice(1,3))?'onMove':''}`
    const pieceImage = `/assets/img/koma/${komaSelection}/${pngName}.png`
    return <img src={pieceImage} class={classes} alt=""/>
}

export const RenderBoard=()=>(
    <>
        <img class="board" src={banImage}
             alt=""/>
        <img class="board" src={gridImage}
             alt=""/>

    </>
)

export const MarkerAt = (Props: { c: string, r: string }) => {
    const classes = `marker koma c${Props.c} r${Props.r}`
    return (<img class={classes} src={markerImg} alt=""/>)
}