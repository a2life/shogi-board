const pngNames = ['fu', 'to', 'kyo', 'nkyo', 'kei', 'nkei', 'gin', 'ngin', 'kin', 'kaku', 'uma', 'hi', 'ryu', 'ou']
const codeNames = 'pPlLnNsSgbBrRk' //code representation of each shogi piece


export const imgRoot = '/assets/img/'
const banImage = imgRoot + "ban/ban_kaya_a.png"
const gridImage = imgRoot + 'masu/masu_dot_xy.png'
const markerImg = imgRoot + 'focus/focus_trpt_g.png'
const komaSelection = 'koma_ryoko_1'



/**
 *
 * @param piece  spcr,  side, piece, column, row. for example, 'g82r', 'g93p', 'gp0p' for Gote, column position pawn,
 * row position 0, and piece is pawn
 * @constructor
 */
export const RenderPiece=(prop:{piece:string})=>{
   //side need to be capital
    const piece=prop.piece
    const pngName = piece[0].toUpperCase()+pngNames[codeNames.indexOf(piece[3])]
    const classes = `koma c${piece[1]} r${piece[2]}`
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

