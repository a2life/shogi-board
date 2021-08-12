
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
    moves?: string[]|string;
    tesuu?: number;
    kifu?:string;
    senteName?:string;
    goteName?:string;

}

export const defaultParams: ShogiKit = {
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
    moves: [''],
    tesuu: 1,


}

