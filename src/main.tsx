import { render } from 'preact'
import { BoardRenderer } from './boardRenderer'
import {ShogiKit} from "./components/defaults";

declare const initialSetup:ShogiKit[]
const target=document.querySelectorAll('.board-app')


target.forEach((element,index)=>{
    render(<BoardRenderer setup={initialSetup[index]} index={index}/>,element)
})


