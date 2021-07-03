import {Board } from "./components/ShogiBoard";
import {ShogiKit} from "./components/defaults";

export function App(prop:{setup:ShogiKit}) {
    return <Board pieceSet={prop.setup}/>
}
