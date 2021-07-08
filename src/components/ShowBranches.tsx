export const ShowBranches=(props:{Notes:{note:string,counter:number}[]})=>{
    if (props.Notes.length>1){
        return (
            <select class="form-select "> {props.Notes.map((e)=>(
                <option value={e.counter}>{e.note}</option>
            ))}</select>)
    }  else {return <></>}
}



