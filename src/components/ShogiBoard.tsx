import '../shogiboard.css'
import {useState} from "preact/hooks";
import {moveParser} from "./MoveHandlers";
import {RenderPiece, RenderBoard,MarkerAt} from "./renderPiece";
import {scoreArray,unifyPieces} from "./utils";
import {defaultParams,ShogiKit} from "./defaults";


export const Board = (Props: { pieceSet: ShogiKit }) => {
    let {senteOnBoard, goteOnBoard, senteOnHand, goteOnHand, markerAt, caption, initialComment, moves, tesuu}
        = {...defaultParams, ...Props.pieceSet}
    const [marker, setMarker] = useState(markerAt.split(','));
    const unifiedPieces=unifyPieces(senteOnBoard,goteOnBoard,senteOnHand,goteOnHand)

//    console.log(unifiedPieces)

    const [piecesInfo, setPiecesInfo] = useState(unifiedPieces)
    const movesArray = moves!.split(',');
    const [moveCounter, setMoveCounter] = useState(tesuu! - 1)
    const [mover, setMover]=useState(movesArray[tesuu!-1].slice(4,6)) //for first 'move' we use 'from' coordinate
    const [history, setHistory] = useState([] as {pieces:string,move:string}[])

    /**
     * Handler for moving forward one play hand.
     * depending on the move, modify onboard and onhand strings for both sente and gote
     * uses MoveCounter
     */

    const playOneMoveHandler = (e: Event) => {
        // console.log('analyzing move', movesArray[moveCounter])
        if (movesArray[moveCounter] === 'x' || movesArray[moveCounter] === undefined) {
            (e.target as HTMLButtonElement).disabled = true;
        } else {
            const nextMove=movesArray[moveCounter]
            const pieces = moveParser(nextMove, piecesInfo)
            setHistory([...history, {pieces:piecesInfo,move:mover}])
            setPiecesInfo(pieces)
              setMover(nextMove.slice(2,4))
            setMoveCounter(moveCounter + 1)

        }

    }

    const moveBackHandler = (e: Event) => {
        e.preventDefault();
        if (moveCounter>0){
            const pieces = history.pop();
            setPiecesInfo(pieces!.pieces);
            setMover(pieces!.move)
            setMoveCounter(moveCounter - 1)
            setHistory(history)
        }
    }


    return <div class="board-container">
        {(caption!.length > 0) && <div class="h5 text-center">{caption}</div>}
        <div class="row-on-hand">
            {scoreArray('g', piecesInfo).map((p) => (parseInt(p[1]) > 1) && <span class={`c${p[0]}`}>{p[1]}</span>)}
        </div>

        <div class=" boardbase-grid" onClick={playOneMoveHandler} onContextMenu={moveBackHandler} >
            <RenderBoard/>
            <MarkerAt c={marker[0]} r={marker[1]}/>
            {piecesInfo.split(',').map((p) => (<RenderPiece piece={p} mover={mover}/>))}
        </div>
        <div class="row-on-hand">
            {scoreArray('s', piecesInfo).map((p) => (parseInt(p[1]) > 1) && <span class={'c' + p[0]}>{p[1]}</span>)}
        </div>

        {moves!.length > 0 &&
        <div class="button-bar-grid ">
            <div class="btn-group">
                <button class="btn btn-sm btn-outline-secondary" value="test" onClick={moveBackHandler}
                        disabled={moveCounter === 0}>
                    <i class="bi bi-caret-left text-dark "/></button>
                <button class="btn btn-sm btn-outline-secondary" value="test" onClick={playOneMoveHandler}
                        disabled={movesArray[moveCounter] === 'undefined' || movesArray[moveCounter] === 'x'}>
                    <i class="bi bi-caret-right text-dark "/></button>

            </div>
        </div>
        }
    </div>

}