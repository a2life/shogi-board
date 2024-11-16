

export const CustomContextMenu = (prop: { x: number, y: number, topics: { title: string, fn: (e:Event) => void, icon?:any}[] }) => {
    const top = prop.y
    const left = prop.x
    return (
        <div class="custom-context-menu" style={{position: 'absolute', left: `${left}px`, top: `${top}px`}}>
            <span class="header">Actions</span>
            <ul>
                    {prop.topics.map(item => {
                    return(<li onClick={(e)=>item.fn(e)}>
                        <span class="icon">{item.icon}</span>{item.title}
                    </li>)
                    }
                )
                }


            </ul>


        </div>
    )
}