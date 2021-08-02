import { render } from 'preact'
import { App } from './app'
import {ShogiKit} from "./components/defaults";
/*
import {KifuParser} from "./components/KifuParser";
import {sample1} from "./components/kifuSample";
*/
declare const initialSetup:ShogiKit[]
const target=document.querySelectorAll('.app')

/*const kifu = new KifuParser(sample1)
import {KifuValidator} from "./kifuValidator";
render(<KifuValidator src={kifu.parse()} />, document.getElementById('app2')!)*/

//(<kifuValidator kifu={kifu} />, document.querySelector('#app2')))

target.forEach((element,index)=>{
    render(<App setup={initialSetup[index]} />,element)
})


