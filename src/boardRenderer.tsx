import {Board} from "./components/ShogiBoard";
import {defaultParams, ShogiKit} from "./components/defaults";
import {unifyPieces, preProcessMoves,prepBranchPoints} from "./components/utils";
import {KifuParser} from "./components/KifuParser";

export function BoardRenderer(prop: { setup: ShogiKit,index:number }) {
    let dataPack={}// stuff datapack in case kifu is available

    if (!!prop.setup.startAt){
        prop.setup.tesuu=prop.setup.startAt;
    }
    if (!!prop.setup.kifu) {
        const data = new KifuParser(prop.setup.kifu)
        dataPack=data.parse();

    }  //otherwise fall back to individual parameters that are available
    let {senteOnBoard, goteOnBoard, senteOnHand, goteOnHand, markerAt, caption, initialComment, moves, tesuu, kifu, senteName, goteName,showMarker}
        = {...defaultParams, ...prop.setup, ...dataPack} //each array set will override if set exists.

    const unifiedPieces = unifyPieces(senteOnBoard, goteOnBoard, senteOnHand, goteOnHand);
    moves=moves||``;
    initialComment=initialComment || '';

    let  {movesArray, initialComment: comment} = preProcessMoves(moves);

    const commentWindow:boolean = (movesArray.toString().indexOf('*'))>0 || initialComment.length>0; //

    initialComment=(initialComment.length>0)?`${initialComment} ${comment}`:comment;


    const branchList=prepBranchPoints(movesArray)
   // console.log('branchList',branchList)


    // check for existence of comments.
   // console.log("commentWindows:",commentWindow, "index",prop.index);
    const HasBranch:boolean = (movesArray && (movesArray.toString().match(/\dJ\d/) || []).length > 0); //check for Branch instruction
    return <Board pieces={unifiedPieces} moves={movesArray} branchList={branchList} caption={caption || ""}
                  initialComment={initialComment} tesuu={tesuu || 0} flags={{commentWindow,HasBranch,showMarker}} kifu={kifu}
            senteName={senteName} goteName={goteName} markerAt={markerAt}/>
}
