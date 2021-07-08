import '../shogiboard.css'
import {useState} from "preact/hooks";
import {moveParser} from "./MoveHandlers";
import {RenderPiece, RenderBoard, MarkerAt} from "./renderPiece";
import {scoreArray} from "./utils";

import * as I from "./Icons";

export const Board = (Props: { pieces: string, moves: string[], branches: { marker: string, index: number }[], caption: string, tesuu: number, initialComment: string, flags: { commentWindow: boolean, HasBranch: boolean } }) => {

    const {pieces, moves: movesArray, branches, caption, tesuu, initialComment, flags} = Props
    const {commentWindow, HasBranch} = flags
    const [piecesInfo, setPiecesInfo] = useState(pieces)
    const rePattern = new RegExp('^[\\-\\+0-9a-z]+((?<branch>[J=])(?<move>\\d+))?:?(?<Note>[一二三四五六七八九１-９　歩と香成桂銀金角馬飛竜玉王投了同直左右引]*)\\*?(.*)')

    const nextMoveNote = (counter: number, movesArray: string[]) => {
        const Note = [] as any
        let j = 0
        let movement = movesArray[counter]
        console.log('movement', movement)
        let moveElements = movement.match(rePattern) as RegExpMatchArray
        console.log('moveElements', moveElements)
        if (moveElements.groups!.branch === 'J') {//if branch move is detected
            Note.push({note: moveElements.groups!.Note, counter: counter}) //store first selection
            do {
                const branchNumber = moveElements.groups!.move //then remember jump number
                while (branches[j].index < counter) {
                    j=j+1;
                }   // using branches array but move passed the current counter position
                while (branches[j].marker !== branchNumber) j++  //move up to matching branch number
                counter = branches[j].index + 1;
                movement = movesArray[counter]
                moveElements = movement.match(rePattern) as RegExpMatchArray
                Note.push({note: moveElements.groups!.Note, counter: counter}) //store first selection

            } while (moveElements.groups!.branch === 'J')
        }

        return Note;
    }

    const [comment, setComment] = useState(initialComment)
    const [startComment, setStartComment] = useState(initialComment)
    const [moveCounter, setMoveCounter] = useState(tesuu! - 1)
    const [mover, setMover] = useState(movesArray[tesuu! - 1].slice(4, 6)) //for first 'move' we use 'from' coordinate
    const [history, setHistory] = useState([] as { pieces: string, move: string, counter: number }[])
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
            setHistory([...history, {pieces: piecesInfo, move: mover, counter: moveCounter}])
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
            miniHistory.push({pieces: pieces, move: currentMove, counter: counter})
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
        let pieces: { pieces: string, move: string, counter: number } | undefined;
        while (counter > tesuu! - 1) {
            pieces = history.pop()
            counter = pieces!.counter
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

            {piecesInfo.split(',').map((p) => (<RenderPiece piece={p} mover={mover}/>))}
        </div>
        <div class="row-on-hand">
            {scoreArray('s', piecesInfo).map((p) => (parseInt(p[1]) > 1) && <span class={'c' + p[0]}>{p[1]}</span>)}
        </div>

        {movesArray.toString().length > 0 &&
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
            {console.log(nextMoveNote(moveCounter, movesArray))}
        </div>
        }
        {commentWindow && <div class="comment">{comment}</div>}
    </div>

}