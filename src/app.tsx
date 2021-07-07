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

    return <Board pieces={unifiedPieces} moves={movesArray} caption={caption || ""}
                  initialComment={initialComment || ""} tesuu={tesuu || 0}/>
}
