import {saveImage} from "./imagecopy";
import {createSFEN} from "./createSFEN";

type history = { pieces: string, playedOn: string, counter: number }[]

import '../shogiboard.css'
import '../button-bar.css'
import {useEffect, useState} from "preact/hooks";
import {moveParser, moveAndRemember} from "./MoveHandlers";
import {RenderPiece, RenderBoard, MarkerAt} from "./renderPiece";
import {
    scoreArray,
    movementNotBranch,
    getMoveNote,
    displayWithSideSymbol,
    extractComments,
    addExtension, lineBreakComments
} from "./utils";
import {ShowBranches} from "./ShowBranches";
import {saveAs} from "file-saver";
import {endOfMoveComment} from "./eomNote";
import * as I from "./Icons";
import DOMPurify from "dompurify";
import {CustomContextMenu} from "./CustomContextMenu";
import {bookMarkSelector, findBookMarks, findPathToBookMark} from "./bookmarks";
import {createBOD} from "./createBOD";


export const Board = (Props: {
    pieces: string, moves: MoveObject[], branchList: any, caption: string, tesuu: number, initialComment: string,
    flags: {
        commentWindow: boolean,
        HasBranch: boolean,
        showMarker: boolean,
        animate: boolean,
        flip: boolean,
        maskBranch: boolean,
        maskBranchOnce: boolean,
        sideComment: boolean,
        bookmarkList:boolean
    }, kifu: string | undefined,
    senteName: string | undefined, goteName: string | undefined, markerAt: string,
    graphics: { koma: string, ban: string, grid: string, marker: string },
    id: number
}) => {

    let {pieces, moves: movesArray, caption, tesuu, initialComment, flags, senteName, goteName, kifu, markerAt} = Props
    let initialHistory = [] as history
    //  let initialAct = movesArray[0].slice(4, 6)
    let initialAct = markerAt;
    let initialCounter = 0;
    const {commentWindow, HasBranch, animate, showMarker} = flags
    const skipToStep = (step: number, pieces: string, moves: MoveObject[]) => {

        let miniHistory = [] as history, counter = 0, move:MoveObject = {} as MoveObject, previousMove = initialAct

        while (counter < step) { //read past to the end

            // counter = moves[counter].index??counter //If Move has index information, use this instead
            const response = moveAndRemember(pieces, previousMove, moves[counter], counter)
            miniHistory.push(response.miniHistory);
            pieces = response.pieces;
            counter = response.counter;
            previousMove = response.movedFrom
            move = response.move
        }
        return {pieces, miniHistory, move, counter}

    }


    const [piecesInfo, setPiecesInfo] = useState(pieces)
    const [markerPosition, setMarkerPosition] = useState(Props.markerAt)
    const [comment, setComment] = useState(initialComment)
    const startComment = initialComment
    const [moveCounter, setMoveCounter] = useState(initialCounter)
    const [previousAct, setPreviousAct] = useState(markerAt) //for very first 'move' placeholder
    const [history, setHistory] = useState(initialHistory)
    const [maskBranch, setMaskBranch] = useState(Props.flags.maskBranch || Props.flags.maskBranchOnce)
    const [markerVisible, setMarkerVisible] = useState(Props.flags.showMarker)
    const [contextMenuStatus, setContextMenuStatus] = useState({visible: false, x: 0, y: 0});
    const [clsName, setClsName] = useState('context-menu-not-visible')

    useEffect(() => {
        if (comment !== '' && comment[0] == '?') {
            setComment(comment.slice(1));
            setMaskBranch(true)
        }
    }, [comment]) //if the first character of the comment is ? then set maskBranch frag.

    if ((tesuu > 0) && !!movesArray[tesuu - 1]) {
        const modifiedProps = skipToStep(tesuu, pieces, movesArray)
        pieces = modifiedProps.pieces
        initialHistory = modifiedProps.miniHistory
        initialAct = modifiedProps.move.move.slice(2, 4)
        markerAt = initialAct;
        initialComment=initialComment+movesArray[tesuu - 1].comment
        initialCounter = modifiedProps.counter
    }

    // next section reinitialization needed to reset board for ajax dump of new kifu information on existing board
    useEffect(() => {
        setPiecesInfo(pieces)
        setMoveCounter(initialCounter)
        setPreviousAct(markerAt)
        setComment(initialComment)
        setHistory(initialHistory)
        setMarkerPosition(markerAt)


    }, [pieces, movesArray])

    useEffect(() => {
        setMarkerVisible(showMarker)
        setMarkerPosition(markerAt)
    }, [markerAt])
    const endOfMoves = (index: number) => {
        let target = ''
        if (index >= movesArray.length) return true
        else if (typeof (movesArray[index]) === 'object') {
            const object = movesArray[index] as MoveObject
            target = object.move
        }

        switch (target.slice(0, 1)) {
            case 'x':  // end of move
            case 'C':  // start of branch
            case undefined:
                return true;

            default:
                return false
        }
    }

    const updateStates = (pieces: any, miniHistory: history, nextMove: MoveObject, index: number) => {
        if (nextMove === null) return false
        setHistory([...history, ...miniHistory])
        //console.log('history', history)
        setPiecesInfo(pieces)
        /* if (typeof nextMove === 'string') {
             setPreviousAct(nextMove.slice(2, 4))
             setMarkerPosition(nextMove.slice(2, 4))
         }
         else*/
        if (typeof nextMove === 'object') {
            setPreviousAct(nextMove.move.slice(2, 4))
            setMarkerPosition(nextMove.move.slice(2, 4))

        }
        if (commentWindow) {
            setComment(extractComments(nextMove))
        }

        setMoveCounter(index)
    }
    const takeOneMoveForward = (index: number) => {
        let moveCounter = index
        if (!endOfMoves(moveCounter)) {

            let move = movesArray[moveCounter]
            /*  if (typeof(move)=='string')
              {if (move.slice(2, 4) === '00') move = move.replace('00', previousAct)}
              else */
            /* {*/
            if (move.move.slice(2, 4) === '00') move.move = move.move.replace('00', previousAct)
            /*}*/
            //       console.log('next move is', nextMove)
            const pieces = moveParser(move, piecesInfo)
            updateStates(pieces, [{
                pieces: piecesInfo,
                playedOn: previousAct,
                counter: moveCounter
            }], move, moveCounter + 1)

        }

    }

    const playOneMoveHandler = (e: Event) => {
        e.preventDefault();

        takeOneMoveForward(moveCounter)

        // console.log('analyzing move', movesArray[moveCounter])


    }


    const skipEndHandler = (e: Event) => {
        e.preventDefault();
        let miniHistory = [] as history, pieces = piecesInfo, counter = moveCounter, move = {} as MoveObject,
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

    const notation = (): string => {

        if (history.length > 0) {

            return getMoveNote(movesArray[history[history.length - 1].counter]) || ''

        } else return ''
    }


    const moveBackHandler = (e: Event) => {
        e.preventDefault();
        if (moveCounter > 0) {
            const pieces = history.pop();
            setPiecesInfo(pieces!.pieces);
            const previousMove = pieces!.playedOn
            setPreviousAct(previousMove)
            setMarkerPosition(previousMove)
            let move = null;

            if (moveCounter - 2 >= 0) {
                move = movesArray[moveCounter - 2]
                setComment(extractComments(move))
            } else setComment(startComment)
            setMoveCounter(pieces!.counter)
            setHistory(history)
        }
    }
    const reWindHandler = () => {

        let pieces: { pieces: string, playedOn: string, counter: number } | undefined;
        while (history.length > 0) {
            pieces = history.pop()
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
        //   console.log('moveCounter', moveCounter)
        takeOneMoveForward(moveCounter)  //OnSelect action will also trigger move forward action
        setMaskBranch(Props.flags.maskBranch) //reset maskBranch flag if it was temporary altered
    }
    const skipToNextBranchHandler = (e: Event) => {
        e.preventDefault();
        let miniHistory = [] as history, pieces = piecesInfo, counter = moveCounter, nextMove: string | MoveObject,
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
    const skipToPrevBranchHandler = (e: Event) => {
        e.preventDefault()
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
        const response = window.prompt('Save kifu record. (kifu file format)', "download.kif")
        if (response) {
            const blob = new Blob([kifu!], {type: 'text/plain;charset=utf-8'})
            saveAs(blob, addExtension(response, '.kifu'))
        }

    }

    const [flipped, setFlipped] = useState(flags.flip);
    const flipHandler = () => setFlipped(!flipped); //flip screen action
    const imgCapture = () => {
        const response = window.prompt('save the board image (.png file format):', "board-image.png")
        if (response) {
            const boardImageNode = document.getElementById('board-image' + Props.id)!
            saveImage(boardImageNode, addExtension(response, '.png'));
        }
    };

    const copyToClipHandler = (e: Event) => {
        e.preventDefault();

        navigator.clipboard.writeText(createSFEN(piecesInfo, history.length)).then(
            () => window.alert('SFEN string copied to clipboard')
        ).catch((reason) => window.alert(reason));

    }
    const bodToClipHandler = (e: Event) => {{
        navigator.clipboard.writeText(createBOD(piecesInfo,senteName,goteName,moveCounter,notation())).then(
            () => window.alert('BOD copied to clipboard')
        ).catch((reason) => window.alert(reason));
    }}

    const sanitizeComment = (comment: string) => {
        return {__html: DOMPurify.sanitize(comment)}
    }
    const commentDiv = (comment: string) => {
        if (comment.length > 0) return <span dangerouslySetInnerHTML={sanitizeComment(comment)}/>
    }
    const logEndOfMove = (movesArray: string[] | MoveObject[], lineCounter: number) => {
        if (endOfMoves(lineCounter))
            return (
                <><br/><span
                    style="font-size:0.75rem">{lineBreakComments(endOfMoveComment(movesArray[moveCounter])[1])}</span></>)
    }
    const boardClickHandler = (e: MouseEvent) => {
        e.preventDefault();
        const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect();
        if ((e.clientX - bounds.left) > (bounds.width) * 0.5) {
            /*move forward */
            (!!Props.branchList[moveCounter] && maskBranch) ? () => {
            } : playOneMoveHandler(e)

        } else {
            /*move backwards */
            moveBackHandler(e)
        }

    }
    const showContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()

        const x = e.clientX - bounds.left, y = e.clientY - bounds.top
        setContextMenuStatus({visible: true, x: x, y: y});


        document.addEventListener('click', function () {
            /*  setContextMenuStatus({visible: false, x: 0, y: 0});*/
            setClsName('context-menu-not-visible')

        }, {once: true});

    }
    useEffect(() => {
            if (contextMenuStatus.visible == true) { /*set contextmenustatus first, let the dom load it, then check*/
                setClsName('context-menu-visible')
            }
        }
        , [contextMenuStatus])

    const transitionEventHandler = (e: Event) => {
        /*
          Trap transitionEnd event and determine if class is set to not-visible. In this case, remove DOM.
         */
        /*  console.log((e.target as HTMLElement).classList)
        console.log((e.target as HTMLElement).classList.contains('context-menu-not-visible'))*/
        /* remove element after fade out */
        if ((e.target as HTMLElement).classList.contains('context-menu-not-visible')) {
            setContextMenuStatus({visible: false, x: 0, y: 0});
        }

    }
   const bookMarkHandler = (index:number) => {
        //console.log('bookmark handler for ',index, findPathToBookMark(index,movesArray));
        if (moveCounter>0) reWindHandler()
        const bookMarkMoves=findPathToBookMark(index,movesArray)

        const {pieces:modPieces,miniHistory,move} = skipToStep(bookMarkMoves.length,pieces,bookMarkMoves)
        updateStates(modPieces,miniHistory,move,index+1)
        setHistory(miniHistory)

    }
    /*
     For utilize fade-in fade-out effect of context menu box ,
     the class has to be set to 'visible' after the custom menu element is added to the dom.
     When it is time to close it,  class has to be set to 'invisible' first to make it invisible, then preact remove it from dom.
     The first will be handled with useEffect hook. The second will be handled with first change the class, then using
     transition event notification to detect a class change, then element will be removed.
     */
    const flipIcon = flipped ? <I.rotateL/> : <I.rotateR/>
    let topics = [
        {title: "Rotate the Board", fn: () => flipHandler(), icon: flipIcon},
        {title: "SFEN to Clipboard", fn: (e: Event) => copyToClipHandler(e), icon: <I.copyIcon/>},
        {title: "BOD to Clipboard", fn: (e:Event) => bodToClipHandler(e), icon: <I.copy2/>},
        {title: "Save PNG board image", fn: () => imgCapture(), icon: <I.camera/>},
    ]
    if (!!kifu) topics.push({title: 'Save Kifu', fn: () => saveKifu(), icon: <I.SaveFile/>});
    const bookMarks = findBookMarks(movesArray)
    //console.log(bookMarks)
    if (bookMarks.length > 0) {
        bookMarks.forEach(bookMark => {
            if (!!bookMark.bookmark) {
                topics.push({title: bookMark.bookmark, fn: () =>bookMarkHandler(bookMark.index), icon: <I.bookmark/>})
            }
        })
    }
    //let classStatus = "starting"

    return <>
        <div class="board-container" onContextMenu={showContextMenu}>
            {(caption!.length > 0) && <div className="caption">{caption}</div>}
            <div class="coordinate-base">
                <div id={"board-image" + Props.id} class={flipped ? "flip180 animate-move" : "animate-move"}>
                    <div class="row-on-hand">
                        {scoreArray('g', piecesInfo).map((p) => (parseInt(p.slice(1)) > 1) &&
                            <span class={flipped ? `c${p[0]} flip180` : `c${p[0]}`}>{p.slice(1)}</span>)}

                        {!!goteName && <div class={flipped
                            ? "flip180 playerName playerName-gote text-align-flipped"
                            : "playerName playerName-gote text-align-normal"
                        }
                        >{displayWithSideSymbol('g', goteName)}</div>}


                    </div>

                    <div class=" boardbase-grid" onClick={boardClickHandler}>

                        <RenderBoard ban={Props.graphics.ban} grid={Props.graphics.grid}/>
                        {showMarker &&
                            <MarkerAt c={markerPosition[0]} r={markerPosition[1]} marker={Props.graphics.marker}/>}

                        {piecesInfo.split(',').map((p) => (
                            <RenderPiece piece={p} mover={previousAct} animate={animate} koma={Props.graphics.koma}/>))}

                    </div>

                    <div class="row-on-hand">
                        {scoreArray('s', piecesInfo).map((p) => (parseInt(p.slice(1)) > 1) &&
                            <span class={flipped ? `c${p[0]} flip180` : `c${p[0]}`}>{p.slice(1)}</span>)}
                        {!!senteName && <div
                            class={flipped
                                ? "flip180 playerName playerName-sente text-align-flipped"
                                : "playerName playerName-sente text-align-normal"
                            }>{displayWithSideSymbol('s', senteName)}</div>}
                        <aside
                            class={flipped ? "flip180 text-align-flipped note-window" : "note-window text-align-normal"}>{notation()}</aside>

                    </div>
                    <div>

                    </div>
                </div>
                {movesArray.length > 0 &&
                    <>
                        {endOfMoves(moveCounter) &&
                            <aside class="endOfMove">{endOfMoveComment(movesArray[moveCounter])[0]}</aside>}

                        <div class="button-bar-grid">
                            <div class="btn-group">
                                <button class="" value="ReWind" onClick={reWindHandler}
                                        disabled={moveCounter === 0}>
                                    <I.SkipStart/></button>
                                {HasBranch &&
                                    <button value="Skip-Backward"
                                            onClick={skipToPrevBranchHandler}
                                            disabled={moveCounter === 0}>
                                        <I.SkipBack/></button>}
                                <button value="Back" onClick={moveBackHandler}
                                        disabled={moveCounter === 0}>
                                    <I.Back/></button>
                                <button value="Play"
                                        onClick={playOneMoveHandler}
                                        disabled={endOfMoves(moveCounter) || !!Props.branchList[moveCounter] && maskBranch}>
                                    <I.Play/></button>
                                {HasBranch &&
                                    <button value="Skip-Forward"
                                            onClick={skipToNextBranchHandler}
                                            disabled={endOfMoves(moveCounter) || !!Props.branchList[moveCounter] && maskBranch}>
                                        <I.SkipForward/></button>}
                                <button value="Skip-to-End"
                                        onClick={skipEndHandler}
                                        disabled={endOfMoves(moveCounter)}>
                                    <I.SkipEnd/></button>

                            </div>
                            {!!Props.branchList[moveCounter] &&
                                <ShowBranches index={moveCounter} Notes={Props.branchList[moveCounter]}
                                              maskBranch={maskBranch}
                                              branchingHandler={branchingHandler}
                                              id={Props.id}/>}
                        </div>

                    </>
                }

                {/*<div class="save-flip-box">
                    <div class="flip-button-position"
                         title='Flip board'
                         onClick={flipHandler}>{flipped ? <I.rotateL/> : <I.rotateR/>}</div>
                    {!!kifu &&
                        <div title='download Kifu' class="save-button-position"
                             onClick={saveKifu}><I.SaveFile/></div>}
                    <div title='SFEN to clipboard' class="image-capture-position" onContextMenu={imgCapture}
                         onClick={copyToClipHandler}>
                        <I.copyIcon/>
                    </div>
                </div>*/}

            </div>
            {commentWindow && !Props.flags.sideComment && <div class="comment">
                {commentDiv(comment)} {logEndOfMove(movesArray, moveCounter)}
            </div>}
            {contextMenuStatus.visible &&
                <CustomContextMenu
                    x={contextMenuStatus.x}
                    y={contextMenuStatus.y}
                    topics={topics}
                    eventHandler={transitionEventHandler}
                    cls={clsName}

                />}
            <div id={"sfen_" + Props.id}
                 class="sfen_data visually-hidden">{createSFEN(piecesInfo, history.length)}</div>
        </div>

        {commentWindow && Props.flags.sideComment && <div class="side-comment">
            {commentDiv(comment)}{logEndOfMove(movesArray, moveCounter)}
        </div>}
        {bookMarks.length > 0 && <div>{bookMarkSelector(bookMarks,flags.bookmarkList,bookMarkHandler,Props.id)}</div>}
    </>

}

