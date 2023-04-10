/**
 * End of Moves note extractor
 * if end of Moves is true, then check to see if description is available. (中断、投了etc.,)
 * Also if long description enclosed with === === exists, then return the quotd string instead of simple description
 * movement[index] should be the parameter, for instance
 * "x:中断===まで8手で中断==="
 * in case of "C:#"  return "Branch # - not sure if this gives any info, but this is a starter
 */


export const endOfMoveComment = (s: string | undefined) => {
    if (typeof (s) === "string") {
     //   console.log('endofmove string:', s);
        const found = s.match(/[xC]:(.*)===(.*)===|[xc]:(.*)/);
        //if long description exists, it is returned in found[1] else description is in found[0]
      //  console.log(found);
        if (Array.isArray(found)) {
            if (typeof (found[3]) === "string") return found[3]
            else if (found[1] === "中断") {
                return found[2]
            } else {
                return found[1] + found[2]
            }
        } else return ""


    } else return ""


}
