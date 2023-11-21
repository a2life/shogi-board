import { render } from 'preact'
import { BoardRenderer } from './boardRenderer'
import {ShogiKit} from "./components/defaults";

declare const initialSetup__ts81:ShogiKit[]
const target=document.querySelectorAll('.board-app')


target.forEach( (element,index)=>{
    render(<BoardRenderer setup={initialSetup__ts81[index]} index={index}/>,element)
})


