/**

 */
import {isMoveObject} from "./utils";

/**
 * End of Moves note extractor
 * @param s
 * if the end of Moves is true, then check to see if a description is available. (中断、投了etc.,)
 * Also if long description enclosed with === === exists, then return the quoted string instead of simple description
 * movement[index] should be the parameter, for instance
 * "x:中断===まで8手で中断==="
 * in case of "C:#"  return "Branch # - not sure if this gives any info, but this is a starter
 */
export const endOfMoveComment = (s: string | MoveObject |undefined):string[] => {
    let endOfMoveComment=['','']
    if (typeof (s) === "string") {

     //   console.log('endOfMove string:', s);
        const found = s.match(/[xC]:(.*?)[*=]{3}?(.*)[*=]{3}|[xc]:(.*)/);
        //if long description exists, it is returned in found[1] else description is in found[0]
        //  console.log(found);
        // first * or = match is lazy match
        if (Array.isArray(found)) {
            const f3=found[3]??'';
            const f1=found[1]??'';
            const f2=found[2]??'';
            endOfMoveComment= [f1+f3,f2];
        }

    }
    else  if (typeof s === 'object' && isMoveObject(s)) {
        const postText = ( s .move).match(/x:(?<note>.*)/)
        // console.log(postText);
        if (Array.isArray(postText)) {

             endOfMoveComment= [s.endOfGame??((postText.groups)?postText.groups.note:''), s.comment??'']
          //  console.log(endOfMoveComment);
        }

    }

    return endOfMoveComment;

}

// const removeChu-dan = (s: string): string => (s.includes("中断")) ? "" : s

//export const endOfMoveComment=(s:string|undefined)=>removeChu-dan(endOfMoveComment_pre(s));
