export const ShowBranches=(props:{Notes:{note:string,counter:number}[],branchingHandler:(e:Event)=>void})=>{
    if (props.Notes.length>1){
        return (
            <select class="option-select " onChange={props.branchingHandler}> {props.Notes.map((e)=>(
                <option value={e.counter}>{e.note}</option>
            ))}</select>)
    }  else {return <></>}
}



