import '../shogiboard.css'

import {useState} from "preact/hooks";
import {moveParser} from "./MoveHandlers";
import {RenderPiece, RenderBoard} from "./renderPiece";
import {scoreArray,unifyPieces} from "./utils";


export interface ShogiKit {

    senteOnBoard: string
    goteOnBoard: string
    senteOnHand: string
    goteOnHand: string
    markerAt: string
    pieceSetSelection?: string
    gridStyleSelection?: string
    boardStyleSelection?: string
    focusImageSelection?: string
    caption?: string
    initialComment?: string;
    moves?: string;
    tesuu?: number;

}

const defaultParams: ShogiKit = {
    senteOnBoard: "19l,29n,39s,49g,59k,69g,79s,89n,99l,28r,88b,17p,27p,37p,47p,57p,67p,77p,87p,97p",
    goteOnBoard: "11l,21n,31s,41g,51k,61g,71s,81n,91l,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p",
    senteOnHand: '',
    goteOnHand: '',
    markerAt: '0,0',
    pieceSetSelection: '',
    gridStyleSelection: 'masu/masu_dot_xy.png',
    boardStyleSelection: 'ban/ban_kaya_a.png',
    focusImageSelection: 'focus/focus_trpt_g.png',
    caption: '',
    initialComment: '',
    moves: '',
    tesuu: 1

}


const MarkerAt = (Props: { c: string, r: string }) => {
    const classes = `marker koma c${Props.c} r${Props.r}`
    return (<img class={classes} src={markerImg} alt=""/>)
}

export const imgRoot = '/assets/img/'
const markerImg = imgRoot + 'focus/focus_trpt_g.png'


export const Board = (Props: { pieceSet: ShogiKit }) => {
    let {senteOnBoard, goteOnBoard, senteOnHand, goteOnHand, markerAt, caption, initialComment, moves, tesuu}
        = {...defaultParams, ...Props.pieceSet}
    const [marker, setMarker] = useState(markerAt.split(','));
    const unifiedPieces=unifyPieces(senteOnBoard,goteOnBoard,senteOnHand,goteOnHand)

//    console.log(unifiedPieces)

    const [piecesInfo, setPiecesInfo] = useState(unifiedPieces)
    const movesArray = moves!.split(',');
    const [moveCounter, setMoveCounter] = useState(tesuu! - 1)
    const [history, setHistory] = useState([] as string[])

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
            const pieces = moveParser(movesArray[moveCounter], piecesInfo)
            setHistory([...history, piecesInfo])
            setPiecesInfo(pieces)
            setMoveCounter(moveCounter + 1)

        }

    }

    const moveBackHandler = (e: Event) => {
        e.preventDefault();
        if (moveCounter>0){
            const pieces = history.pop();
            setPiecesInfo(pieces!);
            setMoveCounter(moveCounter - 1)
            setHistory(history)
        }


    }


    return <div class="wrapper">
        {(caption!.length > 0) && <div class="h5 text-center">{caption}</div>}
        <div class="row-on-hand">
            {scoreArray('g', piecesInfo).map((p) => (parseInt(p[1]) > 1) && <span class={`c${p[0]}`}>{p[1]}</span>)}
        </div>

        <div class=" boardbase-grid" onClick={playOneMoveHandler} onContextMenu={moveBackHandler} >
            <RenderBoard/>
            <MarkerAt c={marker[0]} r={marker[1]}/>
            {piecesInfo.split(',').map((p) => (<RenderPiece piece={p}/>))}
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