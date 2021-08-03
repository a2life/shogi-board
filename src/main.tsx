import { render } from 'preact'
import { BoardRenderer } from './boardRenderer'
import {ShogiKit} from "./components/defaults";
/*
import {KifuParser} from "./components/KifuParser";
import {sample1} from "./components/kifuSample";
*/
declare const initialSetup:ShogiKit[]
const target=document.querySelectorAll('.board-app')

/*const kifu = new KifuParser(sample1)
import {KifuValidator} from "./kifuValidator";
render(<KifuValidator src={kifu.parse()} />, document.getElementById('app2')!)*/

//(<kifuValidator kifu={kifu} />, document.querySelector('#app2')))

target.forEach((element,index)=>{
    render(<BoardRenderer setup={initialSetup[index]} />,element)
})


