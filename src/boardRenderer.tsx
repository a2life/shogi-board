import {Board} from "./components/ShogiBoard";
import {defaultParams, ShogiKit} from "./components/defaults";
import {unifyPieces, preProcessMoves,prepBranchPoints} from "./components/utils";
import {KifuParser} from "./components/KifuParser";

export function BoardRenderer(prop: { setup: ShogiKit }) {
    let dataPack={}// stuff datapack in case kifu is available

    if (!!prop.setup.startAt){
        prop.setup.tesuu=prop.setup.startAt;
    }
    if (!!prop.setup.kifu) {
        const data = new KifuParser(prop.setup.kifu)
        dataPack=data.parse();

    }  //otherwise fall back to individual parameters that are available
    let {senteOnBoard, goteOnBoard, senteOnHand, goteOnHand, markerAt, caption, initialComment, moves, tesuu, kifu, senteName, goteName,showMarker}
        = {...defaultParams, ...prop.setup, ...dataPack}

    const unifiedPieces = unifyPieces(senteOnBoard, goteOnBoard, senteOnHand, goteOnHand)
    let {movesArray,initialComment:comment  }= preProcessMoves(moves!);

    initialComment=`${initialComment} ${comment}`
    const branchList=prepBranchPoints(movesArray)
   // console.log('branchList',branchList)
    const commentWindow = movesArray.toString().indexOf('*')>= 0
    const HasBranch = (movesArray && (movesArray.toString().match(/\dJ\d/) || []).length > 0); //check for Branch instruction
    return <Board pieces={unifiedPieces} moves={movesArray} branchList={branchList} caption={caption || ""}
                  initialComment={initialComment} tesuu={tesuu || 0} flags={{commentWindow,HasBranch,showMarker}} kifu={kifu}
            senteName={senteName} goteName={goteName} markerAt={markerAt}/>
}
