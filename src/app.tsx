import {Board, ShogiKit} from "./components/ShogiBoard";
export function App(prop:{setup:ShogiKit}) {

    return (
        <div >
            <p>ShogiBoard with Vite + Preact!</p>
            <div >
                <Board pieceSet={prop.setup}/>
            </div>

        </div>
    )
}
