import {Board} from "./components/ShogiBoard";
import {defaultParams, ShogiKit} from "./components/defaults";
import {unifyPieces, preProcessMoves, prepBranchPoints, extractComments} from "./components/utils";
import {KifuParser} from "./components/KifuParser";
import {boardImageSet, DataSet} from "./components/SetImageSelection";
import {parseSFEN} from "./components/SfenParser";
import {useState,useEffect} from "preact/hooks";
import {getUrlKifu} from "./components/urlfetch";

export  function BoardRenderer(prop: { setup: ShogiKit, index: number }) {
    const [urlData,setUrlData]=useState({})
    let kifuDataPack = {} // stuff datapack in case kifu is available
    let sfenData={}
    let propTranslate: {
        tesuu?: number, animate?: boolean,
        senteOnBoard?: string, senteOnHand?: string,
        goteOnBoard?: string, goteOnHand?: string,
        initialComment?:string
        showMarker?:boolean
        maskBranch?:boolean
    } = {} //prop conversion
    const propKeys = Object.keys(prop)  //get keys and find if koma, ban, grid or focus image option is set.
    // need to write a object to filter boardImageSet parameters
    let graphicsOptions = {} as DataSet;
    if ('koma' in prop.setup) {
        graphicsOptions.koma = prop.setup.koma
    }
    if ('ban' in prop.setup) {
        graphicsOptions.ban = prop.setup.ban
    }
    if ('grid' in prop.setup) {
        graphicsOptions.grid = prop.setup.grid
    }
    if ('marker' in prop.setup) {
        graphicsOptions.marker = prop.setup.marker
    }

    // --- here, do something to build options
    const {koma, ban, grid, marker} = boardImageSet(graphicsOptions) // get all reference to images path. OK if its empty object

    if ('startAt' in prop.setup) propTranslate.tesuu = prop.setup.startAt;
    if ('smooth' in prop.setup) propTranslate.animate = prop.setup.smooth;
    if ('sOnBoard' in prop.setup) propTranslate.senteOnBoard = prop.setup.sOnBoard;
    if ('sOnHand' in prop.setup) propTranslate.senteOnHand = prop.setup.sOnHand;
    if ('gOnBoard' in prop.setup) propTranslate.goteOnBoard= prop.setup.gOnBoard;
    if('gOnHand' in prop.setup) propTranslate.goteOnHand=prop.setup.gOnHand;
    if('comment' in prop.setup) propTranslate.initialComment=prop.setup.comment;
    if('markerAt' in prop.setup) propTranslate.showMarker=true;

    if (!!prop.setup.sfen) {
        const [sob,gob,soh,goh,side,count]=parseSFEN(prop.setup.sfen);
        sfenData={senteOnHand:soh,goteOnHand:goh,senteOnBoard:sob,goteOnBoard:gob}
    }

    if (!!prop.setup.kifu) {
        const data = new KifuParser(prop.setup.kifu)
        kifuDataPack=data.parse();

    }
    /**
     *
     * @param url :string url path to the kifu. assumes the file pointed to by url is a text file in kifu format
     * text() assumes the file is in utf8.  sJIS file will not work on this implementation.
     */

    useEffect(()=>{    if (!!prop.setup.url) {
        // if url is set, fetch kifu after component is mounted and force rerender.
       getUrlKifu(prop.setup.url).then((result)=>setUrlData(result));

    }},[])

    //otherwise fall back to individual parameters that are available
    let {
        senteOnBoard,
        goteOnBoard,
        senteOnHand,
        goteOnHand,
        markerAt,
        caption,
        initialComment,
        moves,
        tesuu,
        kifu,
        senteName,
        goteName,
        showMarker,
        animate,
        flip,
        maskBranch,
        maskBranchOnce,
        sideComment
    }
        = {...defaultParams, ...propTranslate, ...sfenData, ...kifuDataPack, ...urlData, ...prop.setup,} //each array set will override if variable exists.

    const unifiedPieces = unifyPieces(senteOnBoard, goteOnBoard, senteOnHand, goteOnHand);
    moves = moves || ``;
    initialComment = initialComment || '';

    let {movesArray, lineZeroComment} = preProcessMoves(moves);
    //   console.log(movesArray);



    const commentWindow: boolean = (movesArray.toString().replaceAll("***?***","").indexOf('*')) > 0 || initialComment.length > 1; //
    //if moves array includes the ***comment*** section except for ***?*** which is used to signal masked next branch instruction, or initial comment
    //exists (but string length is more than 1), then commentWindow flag is true.
    initialComment = (initialComment.length > 0) ? `${initialComment}\n${extractComments(lineZeroComment)}` : extractComments(lineZeroComment);


    const branchList = prepBranchPoints(movesArray)
    //   console.log('branchList',branchList)


    // check for existence of comments.
    // console.log("commentWindows:",commentWindow, "index",prop.index);
    const HasBranch: boolean = (movesArray && (movesArray.toString().match(/\dJ\d/) || []).length > 0); //check for Branch instruction
    return <Board pieces={unifiedPieces} moves={movesArray} branchList={branchList} caption={caption || ""}
                  initialComment={initialComment} tesuu={tesuu || 0}
                  flags={{commentWindow, HasBranch, showMarker, animate, flip, maskBranch,maskBranchOnce,sideComment}} kifu={kifu}
                  senteName={senteName} goteName={goteName} markerAt={markerAt} graphics={{koma, ban, grid, marker}} id={prop.index}/>
}
