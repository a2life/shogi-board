import {ShogiKit} from "./ShogiBoard";

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



export const moveParser = (kifString: string, pieceSet: ShogiKit) => {
    const {senteOnHand, goteOnHand, senteOnBoard, goteOnBoard, markerAt} = pieceSet
    let playerOnBoard: string;
    let playerOnHand: string;
    let playedOnBoard: string;
    let playedOnHand: string;
    /// do things here and...
    if (kifString[0] === 's') {
        playerOnBoard = senteOnBoard;
        playerOnHand = senteOnHand
        playedOnBoard = goteOnBoard;
        playedOnHand = goteOnHand;
    } else {
        playerOnBoard = goteOnBoard;
        playerOnHand = goteOnHand;
        playedOnBoard = senteOnBoard;
        playedOnHand = senteOnHand;
    }


    switch (kifString[1]) {
        case '-':
            playerOnBoard = adjustOnBoardPosition(kifString.slice(2), playerOnBoard);
            playedOnBoard = removeFromOnBoardString(kifString.slice(2, 4), playedOnBoard);
            playerOnHand = addToOnHand(kifString.slice(2, 4), playerOnHand, playedOnBoard)

            break;
        case '+':
            playerOnBoard = adjustOnBoardPosition(kifString.slice(2), playerOnBoard);
            playedOnBoard = removeFromOnBoardString(kifString.slice(2, 4), playedOnBoard);
            playerOnHand = addToOnHand(kifString.slice(2, 4), playerOnHand, playedOnBoard)
           playerOnBoard=promotePieceOnPosition(kifString.slice(2, 4), playerOnBoard)
            break;
    }

    if (kifString[0] === 's') {
        return {
            senteOnHand: playerOnHand,
            goteOnHand: playedOnHand,
            senteOnBoard: playerOnBoard,
            goteOnBoard: playedOnBoard,
            markerAt
        }
    } else return {
        senteOnHand: playedOnHand,
        goteOnHand: playerOnHand,
        senteOnBoard: playedOnBoard,
        goteOnBoard: playerOnBoard
    }

}


/**
 *
 * @param moveString example '7677' change 77 to 76
 * @param StringToAdjust original string, ie., '55k,34p,....'
 */
const adjustOnBoardPosition = (moveString: string, stringToAdjust: string) => {
    return stringToAdjust.replace(moveString.slice(2), moveString.slice(0, 2))
}

/**
 * return string to Adjust with Added String delimited by ','
 * @param AddString
 * @param stringToAdjust
 */
const addToOnBoardPosition = (AddString: string, stringToAdjust: string) => {
    return stringToAdjust + ',' + AddString

}


/**
 * returns new Onhand string;
 * @param position '34' etc.,
 * @param fromString onboard string of played side.
 * @param stringToAdd .. onhand string, '',  'l2,p3' etc., shall i change to l,l,p,p,p ?  this may be needed for smoother animation
 */
const addToOnHand = (position: string, stringToAdd: string, fromString: string) => {
    const pieceExists = fromString.indexOf(position);
    if (pieceExists > 0) {
        const piece = fromString.slice(pieceExists + 2, 1)
        return stringToAdd + ',' + piece;
    } else return stringToAdd;
}
/**
 * return string with 77p, removed
 * @param removePosition example '77'
 * @param stringToAdjust original string ie., "19l,29n,39s,49g,59k,69g,79s,89n,99l,28r,88b,17p,27p,37p,47p,57p,67p,77p,87p,97p"
 */
const removeFromOnBoardString = (removePosition: string, stringToAdjust: string) => {
        return stringToAdjust.split(',').filter(w => w.indexOf(removePosition) === -1).toString()
}

/**
 *
 * @param promotePosition position such as '77'
 * @param stringToAdjust, on hand string of sente or gote, like above
 */
const promotePieceOnPosition = (promotePosition: string, stringToAdjust: string) => {
    return stringToAdjust.split(',').map((pos: string) => {
        if (pos.indexOf(promotePosition) === 0) {
            return promotePosition + pos[2].toUpperCase()
        } else {
            return pos
        }
    }).toString()
}