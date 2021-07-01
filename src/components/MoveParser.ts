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

            playerOnHand = addToOnHand(kifString.slice(2, 4), playerOnHand, playedOnBoard)
            playedOnBoard = removeFromOnBoardString(kifString.slice(2, 4), playedOnBoard);

            break;
        case '+':
            playerOnBoard = adjustOnBoardPosition(kifString.slice(2), playerOnBoard);
            playerOnHand = addToOnHand(kifString.slice(2, 4), playerOnHand, playedOnBoard)
            playedOnBoard = removeFromOnBoardString(kifString.slice(2, 4), playedOnBoard);
            playerOnBoard = promotePieceOnPosition(kifString.slice(2, 4), playerOnBoard)
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
 * @param stringToAdd .. onhand string, '',  'l2,p3' etc.,
 */
const addToOnHand = (position: string, stringToAdd: string, fromString: string) => {
    const pieceExists = fromString.indexOf(position);
    let returnString = '';
    if (pieceExists > 0) {
        const piece = fromString.slice(pieceExists + 2, pieceExists + 3)
        returnString = onHandStringAddLetter(stringToAdd, piece.toLowerCase());
    } else {
        returnString = stringToAdd;
    }
    return returnString;
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


/**
 * returns string that is correct format for OnHandString, such as 'p4,l2,n1' or 'p3,l2,n1,b1'
 * @param onHandString  example 'p3,l2,n1'
 *
 * @param letterToAdd   example 'p','b' etc.,
 */
const onHandStringAddLetter = (onHandString: string, letterToAdd: string) => {
    let returnString = '';
    const letterExists = onHandString.indexOf(letterToAdd);
    if (letterExists >= 0) {
        //letter already exists.  Need to increment count part
        let counter = parseInt(onHandString[letterExists + 1]) + 1
        returnString = onHandString.slice(0, letterExists) + counter.toString() + onHandString.slice(letterExists + 2)

    } else {
        returnString = `${onHandString},${letterToAdd}1`;
    }
    return returnString;
}