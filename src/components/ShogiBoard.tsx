import '../shogiboard.css'
import {PieceImg, OnHand} from "./Koma";
import {useState} from "preact/hooks";

export enum player { Sente, Gote}

export interface ShogiKit {

    senteOnBoard: string
    goteOnBoard: string
    senteOnHand: string
    goteOnHand: string
    markerAt: string
    pieceSetSelection: string
    gridStyleSelection: string
    boardStyleSelection: string
    focusImageSelection: string

}

const defaultParams:ShogiKit= {
    senteOnBoard: "19l,29n,39s,49g,59k,69g,79s,89n,99l,28r,88b,17p,27p,37p,47p,57p,67p,77p,87p,97p",
    goteOnBoard: "11l,21n,31s,41g,51k,61g,71s,81n,91l,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p",
    senteOnHand: '',
    goteOnHand: '',
    markerAt: '0,0',
    pieceSetSelection: '',
    gridStyleSelection: 'masu/masu_dot_xy.png',
    boardStyleSelection: 'ban/ban_kaya_a.png',
    focusImageSelection: 'focus/focus_trpt_g.png'
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
    let {senteOnBoard, goteOnBoard, senteOnHand, goteOnHand, markerAt} = {...defaultParams,...Props.pieceSet}
    const [marker,setMarker] = useState( markerAt.split(','));
    const [senteOnboardPieces,setSenteOnboardPieces]=useState(senteOnBoard);
    const [goteOnboardPieces,setGoteOnboardPieces]=useState(goteOnBoard);
    const [senteOnHandPieces,setSenteOnHandPieces]=useState(senteOnHand);
    const [goteOnHandPieces,setGoteOnHandPieces]=useState(goteOnHand);

    const testClickHandler=()=>{
        setSenteOnboardPieces('53s,52B')
        setSenteOnHandPieces('s1')
    }




    return <div>
        <div class="row" style="height:30px;">

        </div>
        <div class="row">
            <div class=" boardbase cell">
                <img class="board" src={banImage}
                     alt=""/>
                <img class="board" src={gridImage}
                     alt=""/>
                <MarkerAt c={marker[0]} r={marker[1]}/>
                {goteOnHandPieces.split(',').map((pn: string) => (pn !== "" && <OnHand side={player.Gote} piece={pn}/>))}
                {senteOnboardPieces.split(',').map((p) => (<PieceImg side={player.Sente} pieceInfo={p}/>))}
                {goteOnboardPieces.split(',').map((p) => (<PieceImg side={player.Gote} pieceInfo={p}/>))}
                {senteOnHandPieces.split(',').map((pn: string) => (pn !== "" && <OnHand side={player.Sente} piece={pn}/>))}
            </div>

        </div>
        <div class="row" style="height:30px">

        </div>
        <button class="btn btn-sm btn-outline-info" value="test" onClick={testClickHandler} ><i class="bi bi-play text-dark "></i></button>
        </div>
        }