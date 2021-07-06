import '../shogiboard.css'
import {useState} from "preact/hooks";
import {moveParser} from "./MoveHandlers";
import {RenderPiece, RenderBoard, MarkerAt} from "./renderPiece";
import {scoreArray, unifyPieces, preProcessMoves} from "./utils";
import {defaultParams, ShogiKit} from "./defaults";
import * as I from "./Icons";

export const Board = (Props: { pieceSet: ShogiKit }) => {
    let {senteOnBoard, goteOnBoard, senteOnHand, goteOnHand, markerAt, caption, initialComment, moves, tesuu}
        = {...defaultParams, ...Props.pieceSet}
    const [marker, setMarker] = useState(markerAt.split(','));
    const unifiedPieces = unifyPieces(senteOnBoard, goteOnBoard, senteOnHand, goteOnHand)

//    console.log(unifiedPieces)

    const [piecesInfo, setPiecesInfo] = useState(unifiedPieces)
    let movesArray = preProcessMoves(moves!);
    const commentWindow = movesArray.toString().indexOf('*')>= 0
    if (movesArray[0][0] === '*') { //if the first line is comment then,
        initialComment = `${initialComment} ${movesArray[0].slice(1)}`
        //   console.log('initialComment', initialComment)
        movesArray.splice(0, 1)
    }
    const HasBranch = (moves && (moves.toString().match(/\dJ\d/) || []).length > 0); //check for Branch instruction
    const [comment, setComment] = useState(initialComment)
    const [startComment, setStartComment] = useState(initialComment)
    const [moveCounter, setMoveCounter] = useState(tesuu! - 1)
    const [mover, setMover] = useState(movesArray[tesuu! - 1].slice(4, 6)) //for first 'move' we use 'from' coordinate
    const [history, setHistory] = useState([] as { pieces: string, move: string, counter:number}[])


    const endOfMoves = (counter: number) => {
        switch (movesArray[counter][0]) {
            case 'x':  // end of move
            case 'C':  // start of branch
            case undefined:
                return true;

            default:
                return false
        }
    }

    const playOneMoveHandler = (e: Event) => {
        // console.log('analyzing move', movesArray[moveCounter])
        if (!endOfMoves(moveCounter)) {
            let nextMove = movesArray[moveCounter]
        //    if (nextMove.slice(2, 4) === '00') nextMove = nextMove.replace('00', mover)
            console.log('next move is', nextMove)
            const pieces = moveParser(nextMove, piecesInfo)
            setHistory([...history, {pieces: piecesInfo, move: mover, counter:moveCounter}])
            setPiecesInfo(pieces)
            setMover(nextMove.slice(2, 4))
            if (commentWindow) {
                setComment(nextMove.indexOf('*') >= 0 ? nextMove.slice(nextMove.indexOf('*') + 1) : "")
            }
            setMoveCounter(moveCounter + 1)

        }

    }
    const skipEndHandler = (e: Event) => {
        let miniHistory = [], pieces = piecesInfo, counter = moveCounter, nextMove: string, currentMove = mover

        while (!endOfMoves(counter)) { //read past to the end
            miniHistory.push({pieces: pieces, move: currentMove, counter:counter})
            nextMove = movesArray[counter]
 //           if (nextMove.slice(2, 4) === '00') nextMove.replace('00', mover)
            pieces = moveParser(nextMove, pieces) //get updated pieces
            currentMove = nextMove.slice(2, 4)
            counter++
        }
        setHistory([...history, ...miniHistory])
        setPiecesInfo(pieces)
        setMover(nextMove!.slice(2, 4))
        if (commentWindow) {
            setComment(nextMove!.indexOf('*') >= 0 ? nextMove!.slice(nextMove!.indexOf('*') + 1) : "")
        }
        setMoveCounter(counter)

    }

    const moveBackHandler = (e: Event) => {
        e.preventDefault();
        if (moveCounter > 0) {
            const pieces = history.pop();
            setPiecesInfo(pieces!.pieces);
            const nextMove = pieces!.move
            setMover(nextMove)
            let move = "";

            if (moveCounter - 2 >= 0) {
                move = movesArray[moveCounter - 2]
                setComment(move.indexOf('*') >= 0 ? move.slice(move.indexOf('*') + 1) : "")
            } else setComment(startComment)
            setMoveCounter(pieces!.counter)
            setHistory(history)
        }
    }
    const reWindHandler = (e: Event) => {
        let counter = moveCounter;
        let pieces: { pieces: string, move: string, counter:number} | undefined;
        while (counter > tesuu! - 1) {
            pieces = history.pop()
            counter=pieces!.counter
        }

        setPiecesInfo(pieces!.pieces);
        setMover(pieces!.move)
        setComment(startComment)
        setMoveCounter(tesuu! - 1)
        setHistory(history)

    }


    return <div class="board-container">
        {(caption!.length > 0) && <div class="h5 text-center pt-1">{caption}</div>}
        <div class="row-on-hand">
            {scoreArray('g', piecesInfo).map((p) => (parseInt(p[1]) > 1) && <span class={`c${p[0]}`}>{p[1]}</span>)}
        </div>

        <div class=" boardbase-grid" onClick={playOneMoveHandler} onContextMenu={moveBackHandler}>
            <RenderBoard/>
            <MarkerAt c={marker[0]} r={marker[1]}/>
            {piecesInfo.split(',').map((p) => (<RenderPiece piece={p} mover={mover}/>))}
        </div>
        <div class="row-on-hand">
            {scoreArray('s', piecesInfo).map((p) => (parseInt(p[1]) > 1) && <span class={'c' + p[0]}>{p[1]}</span>)}
        </div>

        {moves!.toString().length > 0 &&
        <div class="button-bar-grid ">
            <div class="btn-group">
                <button class="btn btn-sm btn-outline-secondary" value="ReWind" onClick={reWindHandler}
                        disabled={moveCounter === 0}>
                    <I.SkipStart/></button>
                {HasBranch &&
                <button class="btn btn-sm btn-outline-secondary" value="Skip-Backward" onClick={moveBackHandler}
                        disabled={moveCounter === 0}>
                    <I.SkipBack/></button>}
                <button class="btn btn-sm btn-outline-secondary" value="Back" onClick={moveBackHandler}
                        disabled={moveCounter === 0}>
                    <I.Back/></button>
                <button class="btn btn-sm btn-outline-secondary" value="Play" onClick={playOneMoveHandler}
                        disabled={movesArray[moveCounter] === 'undefined' || movesArray[moveCounter] === 'x'}>
                    <I.Play/></button>
                {HasBranch &&
                <button class="btn btn-sm btn-outline-secondary" value="Skip-Forward" onClick={playOneMoveHandler}
                        disabled={movesArray[moveCounter] === 'undefined' || movesArray[moveCounter] === 'x'}>
                    <I.SkipForward/></button>}
                <button class="btn btn-sm btn-outline-secondary" value="Skip-to-End" onClick={skipEndHandler}
                        disabled={movesArray[moveCounter] === 'undefined' || movesArray[moveCounter] === 'x'}>
                    <I.SkipEnd/></button>

            </div>
        </div>
        }
        {commentWindow && <div class="comment">{comment}</div>}
    </div>

}