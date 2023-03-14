type history = { pieces: string, playedOn: string, counter: number }[]

import '../shogiboard.css'
import {useState} from "preact/hooks";
import {moveParser, moveAndRemember} from "./MoveHandlers";
import {RenderPiece, RenderBoard, MarkerAt} from "./renderPiece";
import {scoreArray, movementNotBranch, getMoveNote, displayWithSideSymbol, extractComments} from "./utils";
import {ShowBranches} from "./ShowBranches";
import {saveAs} from "file-saver";
import * as I from "./Icons";

export const Board = (Props: {
    pieces: string, moves: string[], branchList: any, caption: string, tesuu: number, initialComment: string,
    flags: { commentWindow: boolean, HasBranch: boolean, showMarker: boolean, animate: boolean }, kifu: string | undefined,
    senteName: string | undefined, goteName: string | undefined, markerAt: string
}) => {

    let {pieces, moves: movesArray, caption, tesuu, initialComment, flags, senteName, goteName, kifu, markerAt} = Props
    let initialHistory = [] as history
    let initialAct = movesArray[0].slice(4, 6)
    let initialCounter = 0;
    const {commentWindow, HasBranch, showMarker, animate} = flags
    const skipToCounter = (tesuu: number, pieces: string) => {

        let miniHistory = [] as history, counter = 0, move = "", previousMove = initialAct

        while (counter < tesuu) { //read past to the end

            const response = moveAndRemember(pieces, previousMove, movesArray[counter], counter)
            miniHistory.push(response.miniHistory);
            pieces = response.pieces;
            counter = response.counter;
            previousMove = response.movedFrom
            move = response.move


        }
        return {pieces, miniHistory, move, counter}

    }
    if (tesuu > 1) {
        const modifiedProps = skipToCounter(tesuu, pieces)
        pieces = modifiedProps.pieces
        initialHistory = modifiedProps.miniHistory
        initialAct = modifiedProps.move.slice(2, 4)
        markerAt = initialAct;
        initialCounter = modifiedProps.counter
    }

    const [piecesInfo, setPiecesInfo] = useState(pieces)
    const [markerPosition, setMarkerPosition] = useState(markerAt)


    const [comment, setComment] = useState(initialComment)
    const startComment = initialComment
    const [moveCounter, setMoveCounter] = useState(initialCounter)
    const [previousAct, setPreviousAct] = useState(initialAct) //for first 'move' we use 'from' coordinate
    const [history, setHistory] = useState(initialHistory)
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

    const updateStates = (pieces: any, miniHistory: history, nextMove: string, index: number) => {
        setHistory([...history, ...miniHistory])
        setPiecesInfo(pieces)
        setPreviousAct(nextMove.slice(2, 4))
        setMarkerPosition(nextMove.slice(2, 4))
        if (commentWindow) {
            setComment(extractComments(nextMove))
        }

        setMoveCounter(index)
    }
    const takeOneMoveForward = (index: number) => {
        let moveCounter = index
        if (!endOfMoves(moveCounter)) {

            let move = movesArray[moveCounter]
            if (move.slice(2, 4) === '00') move = move.replace('00', previousAct)
            //       console.log('next move is', nextMove)
            const pieces = moveParser(move, piecesInfo)
            updateStates(pieces, [{
                pieces: piecesInfo,
                playedOn: previousAct,
                counter: moveCounter
            }], move, moveCounter + 1)

        }

    }

    const playOneMoveHandler = () => {
        // console.log('analyzing move', movesArray[moveCounter])
        takeOneMoveForward(moveCounter)

    }


    const skipEndHandler = () => {
        let miniHistory = [] as history, pieces = piecesInfo, counter = moveCounter, move = '',
            currentMove = previousAct

        while (!endOfMoves(counter)) { //read past to the end
            move = movesArray[counter]
            const response = moveAndRemember(pieces, currentMove, move, counter)
            miniHistory.push(response.miniHistory);

            pieces = response.pieces;
            counter = response.counter;
            currentMove = response.movedFrom
            move = response.move

        }
        updateStates(pieces, miniHistory, move, counter)

    }
    const notation = () => {
        if (history.length > 0) {
            (history[history.length - 1].counter)
            return getMoveNote(movesArray[history[history.length - 1].counter])
        }
    }

    const moveBackHandler = (e: Event) => {
        e.preventDefault();
        if (moveCounter > 0) {
            const pieces = history.pop();
            setPiecesInfo(pieces!.pieces);
            const previousMove = pieces!.playedOn
            setPreviousAct(previousMove)
            setMarkerPosition(previousMove)
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
        let pieces: { pieces: string, playedOn: string, counter: number } | undefined;
        while (history.length > 0) {
            pieces = history.pop()
            counter = pieces!.counter
        }

        setPiecesInfo(pieces!.pieces);
        setPreviousAct(pieces!.playedOn)
        setMarkerPosition(pieces!.playedOn)
        setComment(startComment)
        setMoveCounter(0)
        setHistory(history)

    }
    const branchingHandler = (e: Event) => {
        e.preventDefault();
        const newTarget = (e.target as HTMLSelectElement).value
        // console.log('selected', newTarget)
        //    setMoveCounter(parseInt(newTarget))
        const moveCounter = parseInt(newTarget)
        takeOneMoveForward(moveCounter)  //OnSelect action will also trigger move forward action

    }
    const skipToNextBranchHandler = () => {
        let miniHistory = [] as history, pieces = piecesInfo, counter = moveCounter, nextMove: string,
            currentMove = previousAct

        if (endOfMoves(counter)) return

        do { //read past to the end
            nextMove = movesArray[counter]
            const response = moveAndRemember(pieces, currentMove, nextMove, counter)
            miniHistory.push(response.miniHistory);
            pieces = response.pieces;
            counter = response.counter;
            currentMove = response.movedFrom
            nextMove = response.move
        }
        while (!endOfMoves(counter) && movementNotBranch(counter, movesArray))
        updateStates(pieces, miniHistory, nextMove, counter)
    }
    const skipToPrevBranchHandler = () => {
        let counter = moveCounter;
        let pieces: { pieces: string, playedOn: string, counter: number } | undefined;
        do {
            pieces = history.pop()
            counter = pieces!.counter
        } while ((history.length > 0) && movementNotBranch(counter, movesArray))
        setPiecesInfo(pieces!.pieces);
        setPreviousAct(pieces!.playedOn)
        setMarkerPosition(pieces!.playedOn)
        if (commentWindow) {
            const nextMove = movesArray[counter]
            setComment(extractComments(nextMove))
        }

        setMoveCounter(counter)
        setHistory(history)
    }

    const saveKifu = () => { //this button will only display when kifu is available, so no check on Props.kifu is performed here
        const blob = new Blob([kifu!], {type: 'text/plain;charset=utf-8'})
        saveAs(blob, "download.kif")
    }

    const [flipped, setFlipped] = useState(false);
    const flipHandler = () => setFlipped(!flipped); //flip screen action
    return <div class="board-container">
        {(caption!.length > 0) && <div className="h5 text-center pt-1">{caption}</div>}
        <div style="position:relative;">
            <div class={flipped ? "flip180 animate-move" : "animate-move"}>
                <div class="row-on-hand">
                    {scoreArray('g', piecesInfo).map((p) => (parseInt(p.slice(1)) > 1) &&
                        <span class={`c${p[0]}`}>{p.slice(1)}</span>)}

                    {!!goteName && <div class={flipped
                        ? "flip180 playerName playerName-gote text-align-flipped"
                        : "playerName playerName-gote text-align-normal"
                    }
                    >{displayWithSideSymbol('g', goteName)}</div>}


                </div>

                <div class=" boardbase-grid" onClick={playOneMoveHandler} onContextMenu={moveBackHandler}>
                    <RenderBoard/>
                    {showMarker && <MarkerAt c={markerPosition[0]} r={markerPosition[1]}/>}

                    {piecesInfo.split(',').map((p) => (<RenderPiece piece={p} mover={previousAct} animate={animate}/>))}
                </div>
                <div class="row-on-hand">
                    {scoreArray('s', piecesInfo).map((p) => (parseInt(p.slice(1)) > 1) &&
                        <span class={'c' + p[0]}>{p.slice(1)}</span>)}
                    {!!senteName && <div
                        class={flipped
                            ? "flip180 playerName playerName-sente text-align-flipped"
                            : "playerName playerName-sente text-align-normal"
                    }>{displayWithSideSymbol('s', senteName)}</div>}
                    <aside class={flipped ? "flip180 note-window" : "note-window"}>{notation()}</aside>
                </div>
                <div>

                </div>
            </div>
            {movesArray.toString().length > 0 &&
                <div class="button-bar-grid">
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-secondary" value="ReWind" onClick={reWindHandler}
                                disabled={moveCounter === 0}>
                            <I.SkipStart/></button>
                        {HasBranch &&
                            <button class="btn btn-sm btn-outline-secondary" value="Skip-Backward"
                                    onClick={skipToPrevBranchHandler}
                                    disabled={moveCounter === 0}>
                                <I.SkipBack/></button>}
                        <button class="btn btn-sm btn-outline-secondary" value="Back" onClick={moveBackHandler}
                                disabled={moveCounter === 0}>
                            <I.Back/></button>
                        <button class="btn btn-sm btn-outline-secondary" value="Play" onClick={playOneMoveHandler}
                                disabled={endOfMoves(moveCounter)}>
                            <I.Play/></button>
                        {HasBranch &&
                            <button class="btn btn-sm btn-outline-secondary" value="Skip-Forward"
                                    onClick={skipToNextBranchHandler}
                                    disabled={endOfMoves(moveCounter)}>
                                <I.SkipForward/></button>}
                        <button class="btn btn-sm btn-outline-secondary" value="Skip-to-End" onClick={skipEndHandler}
                                disabled={endOfMoves(moveCounter)}>
                            <I.SkipEnd/></button>

                    </div>
                    {!!Props.branchList[moveCounter] &&
                        <ShowBranches index={moveCounter} Notes={Props.branchList[moveCounter]}
                                      branchingHandler={branchingHandler}/>}
                </div>
            }
            {commentWindow && <div class="comment">{comment}</div>}
            <div class="save-flip-box">
                <div class="flip-button-position" title='Flip board'
                     onClick={flipHandler}>&#x21c5;</div>
                {!!kifu &&
                    <div title='download Kifu' class="save-button-position"
                         onClick={saveKifu}>&#x21f2;</div>}
            </div>

        </div>
    </div>

}