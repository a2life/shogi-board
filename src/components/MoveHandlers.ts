

/**
 * move parser section
 * example of move

 "s-7677",:white moves a piece from 77 to 76
 "g-3433",:black moves a piece from 33 to 34
 "sd55g",:black drops a gold to 5e.
 "g-3534***do you think this is cool? ***: white moves a piece from 34 to 35. Comment windows displays "do you think this is cool?"
 s+2228:piece at the location 28 is moved to 22 and then get promoted.
 "x": an end of moves indicator
 */




/**
 * take pieceSet, analyze move and then reflect on pieceSet and return new pieceSet
 * @param {MoveObject} moveObject  like s-5216,   side(s), move(-), to(52), from(16)
 * @param {String} pieceSet  like "s53s,s16b,g41s,g51k,g61s,ssSs,grGr,grGr,gpGp,gpGp,gpGp,glGl,ggGg"
 *
  */
export const moveParser = (moveObject:MoveObject, pieceSet:string) => {

    /// do things here and...
    const kifString = moveObject.move
    let modifiedPieceSet=pieceSet
    const player=kifString[0]
    const side=(player==='s')?"g":"s"
    const to=kifString.slice(2,4)
    const move=kifString[1]
    if (move==='-' || move==='+') {
        const from=kifString.slice(4,6)
        const search=side+to
        //console.log('search=',search)


        const targetPieceIndex=pieceSet.indexOf(search)//first check if there is a piece in the destination.
        if (targetPieceIndex>=0){
            const targetPiece=pieceSet.slice(targetPieceIndex,targetPieceIndex+4)
            const capturedPiece=player+targetPiece[3].toLowerCase()+player.toUpperCase()+targetPiece[3].toLowerCase()
            modifiedPieceSet=pieceSet.replace(targetPiece,capturedPiece);        // if so, move the piece to onHand of player side,
        }


        modifiedPieceSet=modifiedPieceSet.replace(from,to) // then adjust the board position of a piece being played.
        if (move==='+') {  //promote a target piece.
            const toPieceIndex= modifiedPieceSet.indexOf(to);
          //  console.log('to pieceIndex',toPieceIndex)
            const pieceRank=pieceSet[toPieceIndex+2]
            const promotedRank=pieceRank.toUpperCase()
          //  console.log('to',to,'promotable piece',pieceRank,'promotedRank',promotedRank)

            modifiedPieceSet=modifiedPieceSet.replace(to+pieceRank,to+promotedRank)
        }
    }

    if (move==='d'){
        //find pieces in the list
        const piece=kifString[4]
        const search=player+piece+player.toUpperCase()+piece
       // console.log('searching',search)
        const moveTo=player+to+piece
       // console.log('replacing',moveTo)
        modifiedPieceSet=pieceSet.replace(search,moveTo)
        // then adjust the position to 'to'
        // does not check if the piece exists

    }
    // console.log('returning', modifiedPieceSet)
    return modifiedPieceSet;

}

/**
 *  take piecesSet, CurrentMove and NextMove, create a history to push to history array new piece set and return
 * @param pieces
 * @param movedFrom
 * @param move
 * @param counter
 */
export const moveAndRemember=(pieces:string, movedFrom:string, move:MoveObject, counter:number)=>{

    const miniHistory={pieces: pieces, playedOn: movedFrom, counter: counter}
    //let  nextMove = movesArray[counter]
 /*   if (typeof move==='string') {
        if (move.slice(2, 4) === '00') move = move.replace('00', movedFrom)
        pieces = moveParser(move, pieces) //get updated pieces
        movedFrom = move.slice(2, 4)
    }
    else { *///move is MoveObject
        if (move.move.slice(2,4) === '00') move.move=move.move.replace('00', movedFrom)
        pieces = moveParser(move, pieces)
        movedFrom = move.move.slice(2,4)
   /* }*/
    counter++
    return {miniHistory,pieces,move,movedFrom,counter}

}

