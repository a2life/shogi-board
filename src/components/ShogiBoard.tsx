import '../shogiboard.css'
import {PieceImg, OnHand} from "./Koma";
import {useState} from "preact/hooks";
import {moveParser} from "./MoveParser";

export enum player { Sente, Gote}

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
const banImage = imgRoot + "ban/ban_kaya_a.png"
const gridImage = imgRoot + 'masu/masu_dot_xy.png'
const markerImg = imgRoot + 'focus/focus_trpt_g.png'
export const Board = (Props: { pieceSet: ShogiKit }) => {
    let {senteOnBoard, goteOnBoard, senteOnHand, goteOnHand, markerAt, caption, initialComment, moves, tesuu}
        = {...defaultParams, ...Props.pieceSet}
    const [marker, setMarker] = useState(markerAt.split(','));
    const [senteOnboardPieces, setSenteOnboardPieces] = useState(senteOnBoard);
    const [goteOnboardPieces, setGoteOnboardPieces] = useState(goteOnBoard);
    const [senteOnHandPieces, setSenteOnHandPieces] = useState(senteOnHand);
    const [goteOnHandPieces, setGoteOnHandPieces] = useState(goteOnHand);
    const movesArray = moves!.split(',');
    const [moveCounter, setMoveCounter] = useState(tesuu! - 1)
    const testClickHandler = () => {
        setSenteOnboardPieces('53s,52B')
        setSenteOnHandPieces('s1')
    }

    /**
     * Handler for moving forward one play hand.
     * depending on the move, modify onboard and onhand strings for both sente and gote
     * uses MoveCounter
     */
    const playOneMoveHandler = (e: Event) => {
        console.log('analyzing move', movesArray[moveCounter])
        if (movesArray[moveCounter] === 'x') (e.target as HTMLButtonElement).disabled = true;
        //decypher and manupulate onboardPieces and onHand pieces string
        // push the move to string array and save.
        const {senteOnHand, goteOnHand, senteOnBoard, goteOnBoard} = moveParser(movesArray[moveCounter], {

            senteOnBoard: senteOnboardPieces,
            senteOnHand: senteOnHandPieces,
            goteOnBoard: goteOnboardPieces,
            goteOnHand: goteOnHandPieces,
            markerAt

        })
        setGoteOnboardPieces(goteOnBoard)
        setSenteOnboardPieces(senteOnBoard)
        setGoteOnHandPieces(goteOnHand)
        setSenteOnHandPieces(senteOnHand)
        setMoveCounter(moveCounter + 1)
    }


    return <div class="wrapper">
        {(caption!.length > 0) && <div class="h5 text-center">{caption}</div>}
        <div class="row-on-hand">
            {goteOnHandPieces.split(',').map((pn: string) => (pn !== "" && <OnHand side={player.Gote} piece={pn}/>))}
        </div>

        <div class=" boardbase-grid">
            <img class="board" src={banImage}
                 alt=""/>
            <img class="board" src={gridImage}
                 alt=""/>
            <MarkerAt c={marker[0]} r={marker[1]}/>
            {senteOnboardPieces.split(',').map((p) => (<PieceImg side={player.Sente} pieceInfo={p}/>))}
            {goteOnboardPieces.split(',').map((p) => (<PieceImg side={player.Gote} pieceInfo={p}/>))}
        </div>
        <div class="row-on-hand">
            {senteOnHandPieces.split(',').map((pn: string) => (pn !== "" && <OnHand side={player.Sente} piece={pn}/>))}
        </div>

        <div class="button-bar-grid ">
            <div class="btn-group">
                <button class="btn btn-sm btn-outline-info" value="test" onClick={testClickHandler}><i
                    class="bi bi-play text-dark "></i></button>
                <button class="btn btn-sm btn-outline-info" value="test" onClick={playOneMoveHandler}><i
                    class="bi bi-play text-dark "></i></button>
                <button class="btn btn-sm btn-outline-info" value="test" onClick={testClickHandler}><i
                    class="bi bi-play text-dark "></i></button>
            </div>
        </div>
    </div>

}