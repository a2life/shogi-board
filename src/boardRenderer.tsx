import {Board} from "./components/ShogiBoard";
import {defaultParams, ShogiKit} from "./components/defaults";
import {unifyPieces, preProcessMoves, prepBranchPoints, extractComments, lineBreakComments} from "./components/utils";
import {KifuParser} from "./components/KifuParser";
import {boardImageSet, DataSet, imgRoot} from "./components/SetImageSelection";

export function BoardRenderer(prop: { setup: ShogiKit, index: number }) {
    let dataPack = {}// stuff datapack in case kifu is available
    let propTranslate: {
        tesuu?: number, animate?: boolean,
        senteOnBoard?: string, senteOnHand?: string,
        goteOnBoard?: string, goteOnHand?: string,
        initialComment?:string
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

    // --- here, do somethign to build options
    const {koma, ban, grid, marker} = boardImageSet(graphicsOptions) // get all reference to images path. OK if its empty object

    if ('startAt' in prop.setup) propTranslate.tesuu = prop.setup.startAt;
    if ('smooth' in prop.setup) propTranslate.animate = prop.setup.smooth;
    if ('sOnBoard' in prop.setup) propTranslate.senteOnBoard = prop.setup.sOnBoard;
    if ('sOnHand' in prop.setup) propTranslate.senteOnHand = prop.setup.sOnHand;
    if ('gOnBoard' in prop.setup) propTranslate.goteOnBoard= prop.setup.gOnBoard;
    if('gOnHand' in prop.setup) propTranslate.goteOnHand=prop.setup.gOnHand;
    if('comment' in prop.setup) propTranslate.initialComment=prop.setup.comment


    if (!!prop.setup.kifu) {
        const data = new KifuParser(prop.setup.kifu)
        dataPack = data.parse();

    }  //otherwise fall back to individual parameters that are available
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
        flip
    }
        = {...defaultParams, ...propTranslate, ...dataPack, ...prop.setup,} //each array set will override if variable exists.

    const unifiedPieces = unifyPieces(senteOnBoard, goteOnBoard, senteOnHand, goteOnHand);
    moves = moves || ``;
    initialComment = initialComment || '';

    let {movesArray, lineZeroComment} = preProcessMoves(moves);
    //   console.log(movesArray);
    const commentWindow: boolean = (movesArray.toString().indexOf('*')) > 0 || initialComment.length > 0; //

    initialComment = (initialComment.length > 0) ? `${initialComment}\n${extractComments(lineZeroComment)}` : extractComments(lineZeroComment);


    const branchList = prepBranchPoints(movesArray)
    //   console.log('branchList',branchList)


    // check for existence of comments.
    // console.log("commentWindows:",commentWindow, "index",prop.index);
    const HasBranch: boolean = (movesArray && (movesArray.toString().match(/\dJ\d/) || []).length > 0); //check for Branch instruction
    return <Board pieces={unifiedPieces} moves={movesArray} branchList={branchList} caption={caption || ""}
                  initialComment={initialComment} tesuu={tesuu || 0}
                  flags={{commentWindow, HasBranch, showMarker, animate, flip}} kifu={kifu}
                  senteName={senteName} goteName={goteName} markerAt={markerAt} graphics={{koma, ban, grid, marker}}/>
}
