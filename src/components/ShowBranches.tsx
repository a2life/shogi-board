export const ShowBranches = (props: { Notes: { note: string, index: number }[], branchingHandler: (e: Event) => void, index: number }) => {
    if (props.Notes.length > 1) {
        return (
            <select class="option-select" onChange={props.branchingHandler}
                    value={props.index}> {props.Notes.map((e) => {
                return <option value={e.index}>{e.note}</option>
            })}</select>)
    } else {
        return <></>
    }
}



