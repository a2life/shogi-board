export const convertStringToMoveObject=(stringArray:string[]) => {

    const commentPattern = /^\*(.*)/
    const bookmarkPattern = /^&(.*)/
    const endOfGamePattern = /^(まで.*)/
    const moveName = /\d+\s+([\S　]*)/

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
            const hand =!!(moveArray.match(moveName))?moveArray.match(moveName)![1]:'';
            moveObjectArray.push({move: moveArray, hand: hand});
        }

    }

    return moveObjectArray.map((moveObject, index) => {
           return {...moveObject, step: index}
       });
}