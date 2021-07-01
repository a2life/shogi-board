const komaSelection = 'koma_ryoko_1'

enum player { Sente, Gote}

const pieceNames = ['歩', 'と', '香', '成香', '桂', '成桂', '銀', '成銀', '金', '角', '馬', '飛', '竜', '王']
const pngNames = ['fu', 'to', 'kyo', 'nkyo', 'kei', 'nkei', 'gin', 'ngin', 'kin', 'kaku', 'uma', 'hi', 'ryu', 'ou']
const codeNames = 'pPlLnNsSgbBrRk' //code representation of each shogi piece
const kanjiNumber = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']

/**
 *  return part of piece image name, such as 'Sfu'=> 先手歩 or 'Gou'=>後手王
 * @param side playerSide as enum playser.Sente  or player.Gote
 * @param rank pieceName from code. such as p or k
 */
const definePieceFromCode = (side: player, rank: string) => {
    const pngName = pngNames[codeNames.indexOf(rank)]
    return ((side === player.Sente) ? 'S' : 'G') + pngName
}

/**
 * return an object with col number row number and name of jpg image,  such as {col:"7",row:"6",piece:"Sfu'}
 * @param notation for example '76p'
 * @param side for example, player.Sente enum 0
 */
const codePieceParse = (notation: string, side: player) => {
    const col = notation[0];
    const row = notation[1];
    const piece = definePieceFromCode(side, notation[2])
    return {col, row, piece}
}

/**
 * returns <image src='../Sfu.png' class='c6 r7' alt="" />
 * @param Props {side:player=>player.Sente or player.Gote , pieceInfo:such as '76p'}
 * @constructor
 */
export const PieceImg = (Props: { side: player, pieceInfo: string }) => { // "先手　
    const {col, row, piece} = codePieceParse(Props.pieceInfo, Props.side)

    const classes = `koma c${col} r${row}`
    const pieceImage = `/assets/img/koma/${komaSelection}/${piece}.png`
    return <img src={pieceImage} class={classes} alt=""/>
}

/**
 *  return one element for OnHand pices with qty info.
 * @param Props  side=0 or 1 or player enum to indicate sente or gote piece piece string plus count. eg., p1, n3 etc.,
 * @constructor
 */
export const OnHand = (Props: { side: player, piece: string }) => {
    const side = (Props.side === player.Sente) ? 'S' : 'G';
    const classes = `koma c-${Props.piece[0]}`
    const counterClasses=classes
    const piece = definePieceFromCode(Props.side, Props.piece[0]);
    const count = Props.piece[1];
    const dummyArray=Array(parseInt(count)).fill('!').map((p,i)=>i);
    console.log(dummyArray)
    const pieceImage = `/assets/img/koma/${komaSelection}/${piece}.png`
    return (
        <span>
            {dummyArray.map((i)=>  (<img class={classes} src={pieceImage} alt={i.toString()}/>))}
            {(parseInt(count) > 1) && <span class={counterClasses} >{count}</span>}

        </span>

    )
}