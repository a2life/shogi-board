import { render } from 'preact'
import { App } from './app'
import {ShogiKit} from "./components/defaults";

declare const initialSetup:ShogiKit[]
const target=document.querySelectorAll('.app')
target.forEach((element,index)=>{
    render(<App setup={initialSetup[index]} />,element)
})


