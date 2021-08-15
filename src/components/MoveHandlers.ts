import {ShogiKit} from "./defaults";

/**
 * move parser section
 * example of move

 "s-7677",  : white move a piece from 77 to 76
 "g-3433",  : black moves a piece from 33 to 34
 "sd55g",   : black drops a gold to 5e.
 "g-3534*do you think this is cool?", : white moves a piece from 34 to 35. Comment windows displays"do you think this is cool?"
 s+2228  : piece at the 28 position is moved to 22 and then get promoted.
 "x"   : end of moves indicator
 */


/**
 * take pieceset, analyze move and then reflect on piecese and return new pieceset
 * @param kifString, like s-5216,   side(s), move(-), to(52), from(16)
 * @param pieceSet, like "s53s,s16b,g41s,g51k,g61s,ssSs,grGr,grGr,gpGp,gpGp,gpGp,glGl,ggGg"
 * @param previousMove: like 44, if kifString uses 00 notation for '同' then replace with this value
 */
export const moveParser = (kifString: string, pieceSet:string) => {

    /// do things here and...
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
            modifiedPieceSet=pieceSet.replace(targetPiece,capturedPiece);        // if so, move piece to onHand of player side,
        }


        modifiedPieceSet=modifiedPieceSet.replace(from,to) // then adjust board position of a piece being played.
        if (move==='+') {  //promote target piece.
            const toPieceIndex= modifiedPieceSet.indexOf(to);
          //  console.log('topieceIndex',toPieceIndex)
            const pieceRank=pieceSet[toPieceIndex+2]
            const promotedRank=pieceRank.toUpperCase()
          //  console.log('to',to,'promotable piece',pieceRank,'promotedRank',promotedRank)

            modifiedPieceSet=modifiedPieceSet.replace(to+pieceRank,to+promotedRank)
        }
    }

    if (move==='d'){
        //find piece in the list
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
export const moveAndRemember=(pieces:string,movedFrom:string, move:string,counter:number)=>{

    const miniHistory={pieces: pieces, move: movedFrom, counter: counter}
    //let  nextMove = movesArray[counter]
    if (move.slice(2, 4) === '00') move = move.replace('00', movedFrom)
    pieces = moveParser(move, pieces) //get updated pieces
    movedFrom = move.slice(2, 4)
    counter++
    return {miniHistory,pieces,move,movedFrom,counter}

}

