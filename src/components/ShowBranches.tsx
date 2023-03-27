export const ShowBranches = (props: { Notes: { note: string, index: number }[], branchingHandler: (e: Event) => void, index: number ,maskBranch?:boolean }) => {

    const MoveSelect = ()=><option disabled value="default">Next Move</option>
    if(props.maskBranch){ // in case of masked branch, shuffle options order for quiz
        let currentIndex= props.Notes.length, randomIndex;
        while (currentIndex !=0){
            randomIndex=Math.floor(Math.random()*currentIndex);
            currentIndex--;

            [props.Notes[currentIndex],props.Notes[randomIndex]]=[props.Notes[randomIndex],props.Notes[currentIndex]]
        }
    }
    if (props.Notes.length > 1) {
        return (
            <select class="option-select" onChange={props.branchingHandler}
                value={props.maskBranch?"default":props.index}   > {props.maskBranch && MoveSelect()} {props.Notes.map((e) => {
                return <option value={e.index}>{e.note}</option>
            })}</select>)
    } else {
        return <></>
    }
}



