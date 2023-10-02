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
        console.log('endofmove string:', s);
        const found = s.match(/[xC]:(.*?)[*=]{3}(.*)[*=]{3}|[xc]:(.*)/);
        //if long description exists, it is returned in found[1] else description is in found[0]
        //  console.log(found);
        // first * or = match is lazy match

        if (Array.isArray(found)) {
            const f3=(typeof(found[3])==='string')?found[3]:'';
            const f1=(typeof(found[1])==='string')?found[1]:'';
            const f2=(typeof(found[2])==='string')?found[2]:'';
            return [f1+f3,f2];

        } else return []


    } else return []


}

// const removeChudan = (s: string): string => (s.includes("中断")) ? "" : s

//export const endOfMoveComment=(s:string|undefined)=>removeChudan(endOfMoveComment_pre(s));
