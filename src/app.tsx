import {Board} from "./components/ShogiBoard";
import {defaultParams, ShogiKit} from "./components/defaults";
import {unifyPieces, preProcessMoves,prepBranchPoints} from "./components/utils";


export function App(prop: { setup: ShogiKit }) {
    let {senteOnBoard, goteOnBoard, senteOnHand, goteOnHand, markerAt, caption, initialComment, moves, tesuu}
        = {...defaultParams, ...prop.setup}

    //marker function currently not implemented
   // const [marker, setMarker] = useState(markerAt.split(','));
    const unifiedPieces = unifyPieces(senteOnBoard, goteOnBoard, senteOnHand, goteOnHand)
    let {movesArray,initialComment:comment  }= preProcessMoves(moves!);

    initialComment=`${initialComment} ${comment}`
    const branchList=prepBranchPoints(movesArray)
   // console.log('branchList',branchList)
    const commentWindow = movesArray.toString().indexOf('*')>= 0
    const HasBranch = (movesArray && (movesArray.toString().match(/\dJ\d/) || []).length > 0); //check for Branch instruction
    return <Board pieces={unifiedPieces} moves={movesArray} branchList={branchList} caption={caption || ""}
                  initialComment={initialComment} tesuu={tesuu || 0} flags={{commentWindow,HasBranch}}/>
}
