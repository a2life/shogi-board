export const convertStringToMoveObject=(stringArray:string[]) => {

    const commentPattern = /^\*(.*)/
    const bookmarkPattern = /^&(.*)/
    const endOfGamePattern = /^(まで.*)/

    const moveObjectArray: MoveObject[] = [{move: ''}]; //initialize moveObjectArray with a first element of empty move


    for (const moveArray of stringArray) { //go down the move list and assign move, comment, and bookmark to arrayobject
        const moveElement = moveObjectArray[moveObjectArray.length - 1];
        let moveInfo = true;
        if (commentPattern.test(moveArray)) {
            moveInfo = false;
            moveElement.comment = ((!!moveElement.comment) ? moveElement.comment : '') + moveArray.match(commentPattern)![1] + '\n';
        }
        if (bookmarkPattern.test(moveArray)) {
            moveInfo = false;
            moveElement.bookmark = moveArray.match(bookmarkPattern)![1];
        }
        if (endOfGamePattern.test(moveArray)) {
            moveInfo = false;
            moveElement.endOfGame = moveArray.match(endOfGamePattern)![0];
        }
        if (moveInfo && (moveArray.trim()) != '') {
            moveObjectArray.push({move: moveArray})
        }

    }

        return moveObjectArray
}