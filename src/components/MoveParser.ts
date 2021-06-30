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
const addToOnBoardPosition = (AddString:string, stringToAdjust:string )=>{
    return stringToAdjust+','+AddString

}
/**
 * return string with 77p, removed
 * @param removePosition example '77'
 * @param stringToAdjust original string ie., "19l,29n,39s,49g,59k,69g,79s,89n,99l,28r,88b,17p,27p,37p,47p,57p,67p,77p,87p,97p"
 */
const removeFromOnBoardString=(removePosition:string, stringToAdjust:string)=>{
      stringToAdjust.split(',').filter(w=>w.indexOf(removePosition)<0).toString()
}

