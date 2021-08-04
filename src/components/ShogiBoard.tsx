/** Todos
 * refactor branch move routine - some duplicated lines
 * add a display to show move counter(marker) in shogiBoard
 */

type history = { pieces: string, move: string, counter: number }[]

import '../shogiboard.css'
import {useState} from "preact/hooks";
import {moveParser} from "./MoveHandlers";
import {RenderPiece, RenderBoard, MarkerAt} from "./renderPiece";
import {scoreArray, movementNotBranch, getMoveNote} from "./utils";
import {ShowBranches} from "./ShowBranches";

import * as I from "./Icons";

export const Board = (Props: { pieces: string, moves: string[], branchList: any, caption: string, tesuu: number, initialComment: string, flags: { commentWindow: boolean, HasBranch: boolean } }) => {

    const {pieces, moves: movesArray, caption, tesuu, initialComment, flags} = Props
    const {commentWindow, HasBranch} = flags
    const [piecesInfo, setPiecesInfo] = useState(pieces)


    const [comment, setComment] = useState(initialComment)
    const startComment = initialComment
    const [moveCounter, setMoveCounter] = useState(tesuu! - 1)
    const [mover, setMover] = useState(movesArray[tesuu! - 1].slice(4, 6)) //for first 'move' we use 'from' coordinate
    const [history, setHistory] = useState([] as { pieces: string, move: string, counter: number }[])
    const endOfMoves = (index: number) => {
        if (index >= movesArray.length) return true
        else
            switch (movesArray[index][0]) {
                case 'x':  // end of move
                case 'C':  // start of branch
                case undefined:
                    return true;

                default:
                    return false
            }
    }
    const extractComments=(moveLine:string)=>{
        const index = (moveLine.indexOf('*'));
        const comment= (index>=0)?moveLine.slice(index+1):''
        return comment.replaceAll('*','<br>')
    }
    const updateStates = (pieces: any, miniHistory: history, nextMove: string, index: number) => {
        setHistory([...history, ...miniHistory])
        setPiecesInfo(pieces)
        setMover(nextMove.slice(2, 4))
        if (commentWindow) {
            setComment(extractComments(nextMove))
        }
        setMoveCounter(index)
    }

    const takeOneMoveForward = (index: number) => {
        let moveCounter = index
        if (!endOfMoves(moveCounter)) {
            let nextMove = movesArray[moveCounter]
            if (nextMove.slice(2, 4) === '00') nextMove = nextMove.replace('00', mover)
            //       console.log('next move is', nextMove)
            const pieces = moveParser(nextMove, piecesInfo)
            updateStates(pieces, [{pieces: piecesInfo, move: mover, counter: moveCounter}], nextMove, moveCounter + 1)

        }

    }
    const playOneMoveHandler = () => {
        // console.log('analyzing move', movesArray[moveCounter])
        takeOneMoveForward(moveCounter)

    }
    const skipEndHandler = () => {
        let miniHistory = [], pieces = piecesInfo, counter = moveCounter, nextMove = "", currentMove = mover

        while (!endOfMoves(counter)) { //read past to the end
            miniHistory.push({pieces: pieces, move: currentMove, counter: counter})
            nextMove = movesArray[counter]
            if (nextMove.slice(2, 4) === '00') nextMove = nextMove.replace('00', currentMove)
            pieces = moveParser(nextMove, pieces) //get updated pieces
            currentMove = nextMove.slice(2, 4)
            counter++
        }
        updateStates(pieces, miniHistory, nextMove, counter)

    }
    const notation=()=> {
        if (history.length>0) {
            (history[history.length-1].counter)
            return getMoveNote(movesArray[history[history.length-1].counter])
        }
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
                setComment(extractComments(move))
            } else setComment(startComment)
            setMoveCounter(pieces!.counter)
            setHistory(history)
        }
    }
    const reWindHandler = () => {
        let counter = moveCounter;
        let pieces: { pieces: string, move: string, counter: number } | undefined;
        while (history.length > 0) {
            pieces = history.pop()
            counter = pieces!.counter
        }

        setPiecesInfo(pieces!.pieces);
        setMover(pieces!.move)
        setComment(startComment)
        setMoveCounter(tesuu! - 1)
        setHistory(history)

    }
    const branchingHandler = (e: Event) => {
        e.preventDefault();
        const newTarget = (e.target as HTMLSelectElement).value
        console.log('selected', newTarget)
        //    setMoveCounter(parseInt(newTarget))
        const moveCounter = parseInt(newTarget)
        takeOneMoveForward(moveCounter)  //OnSelect action will also trigger move forward action

    }
    const skipToNextBranchHandler = () => {
        let miniHistory = [], pieces = piecesInfo, counter = moveCounter, nextMove: string, currentMove = mover
        if (endOfMoves(counter)) return
        do { //read past to the end
            miniHistory.push({pieces: pieces, move: currentMove, counter: counter})
            nextMove = movesArray[counter]
            if (nextMove.slice(2, 4) === '00') nextMove = nextMove.replace('00', currentMove)
            pieces = moveParser(nextMove, pieces) //get updated pieces
            currentMove = nextMove.slice(2, 4)
            counter++
        }
        while (!endOfMoves(counter) && movementNotBranch(counter, movesArray))
        updateStates(pieces, miniHistory, nextMove, counter)
    }
    const skipToPrevBranchHandler = () => {
        let counter = moveCounter;
        let pieces: { pieces: string, move: string, counter: number } | undefined;
        do {
            pieces = history.pop()
            counter = pieces!.counter
        } while ((history.length > 0) && movementNotBranch(counter, movesArray))
        setPiecesInfo(pieces!.pieces);
        setMover(pieces!.move)
        if (commentWindow) {
            const nextMove = movesArray[counter]
            setComment(extractComments(nextMove))
        }

        setMoveCounter(counter)
        setHistory(history)
    }
    return <div class="board-container">
        {(caption!.length > 0) && <div class="h5 text-center pt-1">{caption}</div>}
        <div class="row-on-hand">
            {scoreArray('g', piecesInfo).map((p) => (parseInt(p.slice(1)) > 1) && <span class={`c${p[0]}`}>{p.slice(1)}</span>)}
        </div>

        <div class=" boardbase-grid" onClick={playOneMoveHandler} onContextMenu={moveBackHandler}>
            <RenderBoard/>

            {piecesInfo.split(',').map((p) => (<RenderPiece piece={p} mover={mover}/>))}
        </div>
        <div class="row-on-hand">
            {scoreArray('s', piecesInfo).map((p) => (parseInt(p.slice(1)) > 1) && <span class={'c' + p[0]}>{p.slice(1)}</span>)}
           <aside class="note-window">{notation() }</aside>
        </div>

        {movesArray.toString().length > 0 &&
        <div class="button-bar-grid">
            <div class="btn-group">
                <button class="btn btn-sm btn-outline-secondary" value="ReWind" onClick={reWindHandler}
                        disabled={moveCounter === 0}>
                    <I.SkipStart/></button>
                {HasBranch &&
                <button class="btn btn-sm btn-outline-secondary" value="Skip-Backward" onClick={skipToPrevBranchHandler}
                        disabled={moveCounter === 0}>
                    <I.SkipBack/></button>}
                <button class="btn btn-sm btn-outline-secondary" value="Back" onClick={moveBackHandler}
                        disabled={moveCounter === 0}>
                    <I.Back/></button>
                <button class="btn btn-sm btn-outline-secondary" value="Play" onClick={playOneMoveHandler}
                        disabled={endOfMoves(moveCounter)}>
                    <I.Play/></button>
                {HasBranch &&
                <button class="btn btn-sm btn-outline-secondary" value="Skip-Forward" onClick={skipToNextBranchHandler}
                        disabled={endOfMoves(moveCounter)}>
                    <I.SkipForward/></button>}
                <button class="btn btn-sm btn-outline-secondary" value="Skip-to-End" onClick={skipEndHandler}
                        disabled={endOfMoves(moveCounter)}>
                    <I.SkipEnd/></button>

            </div>
            {!!Props.branchList[moveCounter] && <ShowBranches index={moveCounter} Notes={Props.branchList[moveCounter]}
                                                              branchingHandler={branchingHandler}/>}
        </div>
        }
        {commentWindow && <div class="comment">{comment}</div>}
    </div>

}