import {Board} from "./components/ShogiBoard";
import {defaultParams, ShogiKit} from "./components/defaults";
import {unifyPieces, preProcessMoves, prepBranchPoints, extractComments, lineBreakComments} from "./components/utils";
import {KifuParser} from "./components/KifuParser";

export function BoardRenderer(prop: { setup: ShogiKit,index:number }) {
    let dataPack={}// stuff datapack in case kifu is available
    let propTranslate:{tesuu?:number,animate?:boolean} ={} //prop conversion
    if ('startAt' in prop.setup){   // take startAt as tesuu
        propTranslate.tesuu =prop.setup.startAt;
    }
    if ('smooth' in prop.setup ){ //take
        propTranslate.animate=prop.setup.smooth;
    }
    if (!!prop.setup.kifu) {
        const data = new KifuParser(prop.setup.kifu)
        dataPack=data.parse();

    }  //otherwise fall back to individual parameters that are available
    let {senteOnBoard, goteOnBoard, senteOnHand, goteOnHand, markerAt, caption, initialComment, moves, tesuu, kifu, senteName, goteName,showMarker,animate,flip}
        = {...defaultParams,  ...propTranslate,...dataPack,...prop.setup,} //each array set will override if variable exists.

    const unifiedPieces = unifyPieces(senteOnBoard, goteOnBoard, senteOnHand, goteOnHand);
    moves=moves||``;
    initialComment=initialComment || '';

    let  {movesArray, lineZeroComment} = preProcessMoves(moves);
 //   console.log(movesArray);
    const commentWindow:boolean = (movesArray.toString().indexOf('*'))>0 || initialComment.length>0; //

    initialComment=(initialComment.length>0)?`${initialComment}\n${extractComments(lineZeroComment)}`:extractComments(lineZeroComment);


    const branchList=prepBranchPoints(movesArray)
 //   console.log('branchList',branchList)


    // check for existence of comments.
   // console.log("commentWindows:",commentWindow, "index",prop.index);
    const HasBranch:boolean = (movesArray && (movesArray.toString().match(/\dJ\d/) || []).length > 0); //check for Branch instruction
    return <Board pieces={unifiedPieces} moves={movesArray} branchList={branchList} caption={caption || ""}
                  initialComment={initialComment} tesuu={tesuu || 0} flags={{commentWindow,HasBranch,showMarker,animate,flip}} kifu={kifu}
            senteName={senteName} goteName={goteName} markerAt={markerAt}/>
}
