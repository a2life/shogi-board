export const ShowBranches = (props: { Notes: { note: string, index: number }[], branchingHandler: (e: Event) => void, index: number ,nextMove?:boolean }) => {

    const MoveSelect = ()=><option disabled value="default">Move?</option>
    if (props.Notes.length > 1) {
        return (
            <select class="option-select" onChange={props.branchingHandler}
                value={props.nextMove?"default":props.index}   > {props.nextMove && MoveSelect()} {props.Notes.map((e) => {
                return <option value={e.index}>{e.note}</option>
            })}</select>)
    } else {
        return <></>
    }
}



