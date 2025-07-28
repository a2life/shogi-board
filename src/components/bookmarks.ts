export const findBookMarks = (moves: MoveObject[]) => {
    if (moves.length === 0) {
        return []
    } else {
        return moves.map((move, index) => {
            return {bookmark: move.bookmark, index: index}
        })
            .filter((move) => (!!move.bookmark))
    }
}

export const findPathToBookMark=(index:number,moves:MoveObject[]) => {
    if (moves.length === 0) return []
    let i=index
    let path:MoveObject[]=[moves[i]]
    while (i >0){
        i = i-1
       if (moves[i].move[0]==='C'){i=Number(moves[i].move.slice(2))-2}
       path=[moves[i], ...path]
    }
    return path;
}

export const getBookMarkPaths=(moves:MoveObject[]) => {
    const bookMarks=findBookMarks(moves)
    let paths:MoveObject[][]=[]
    for (let i=0; i<bookMarks.length; i++){
        paths.push(findPathToBookMark(bookMarks[i].index,moves))
    }
    return paths
}