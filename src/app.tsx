import {Board} from "./components/ShogiBoard";
import {defaultParams, ShogiKit} from "./components/defaults";
import {scoreArray, unifyPieces, preProcessMoves} from "./components/utils";
import {useState} from "preact/hooks";

export function App(prop: { setup: ShogiKit }) {
    let {senteOnBoard, goteOnBoard, senteOnHand, goteOnHand, markerAt, caption, initialComment, moves, tesuu}
        = {...defaultParams, ...prop.setup}
    //marker function currently not implemented
   // const [marker, setMarker] = useState(markerAt.split(','));
    const unifiedPieces = unifyPieces(senteOnBoard, goteOnBoard, senteOnHand, goteOnHand)
    const movesArray = preProcessMoves(moves!);
    const commentWindow = movesArray.toString().indexOf('*')>= 0
    const HasBranch = (movesArray && (movesArray.toString().match(/\dJ\d/) || []).length > 0); //check for Branch instruction
    console.log('app element called')
    if (movesArray[0][0] === '*') { //if the first line is comment then,
        initialComment = `${initialComment} ${movesArray[0].slice(1)}`
        //   console.log('initialComment', initialComment)
        movesArray.splice(0, 1)
    }
    return <Board pieces={unifiedPieces} moves={movesArray} caption={caption || ""}
                  initialComment={initialComment || ""} tesuu={tesuu || 0} flags={{commentWindow,HasBranch}}/>
}
