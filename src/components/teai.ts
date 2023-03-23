/*
teai evaluator. returns proper goteonHand string.
get teai info in the parameter, then return gote on hand info.
 */
/*
手合割は,次の形式で,表記する。

    手合割：平手

　手合割は,次の表記とする。

    "平手","香落ち","右香落ち","角落ち","飛車落ち","飛香落ち","二枚落ち","三枚落ち","四枚落ち","五枚落ち","左五枚落ち","六枚落ち","左七枚落ち","右七枚落ち","八枚落ち","十枚落ち","その他"

省略したときは,平手と判断する。

 */
const handyCap=["平手","香落ち","右香落ち","角落ち","飛車落ち","飛香落ち","二枚落ち","三枚落ち","四枚落ち","五枚落ち","左五枚落ち","六枚落ち","左七枚落ち","右七枚落ち","八枚落ち","十枚落ち","その他"]

type HandyCaptType ={[key:string]: string}
const handyCapArray:HandyCaptType={
    "平手":"",　// send back empty string
    "香落ち":"11l,21n,31s,41g,51k,61g,71s,81n,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p", //左側(角のある側)の香
    "右香落ち":"21n,31s,41g,51k,61g,71s,81n,91l,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p",
    "角落ち":"11l,21n,31s,41g,51k,61g,71s,81n,91l,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p",
    "飛車落ち":"11l,21n,31s,41g,51k,61g,71s,81n,91l,22b,13p,23p,33p,43p,53p,63p,73p,83p,93p",
    "飛香落ち":"11l,21n,31s,41g,51k,61g,71s,81n,91l,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p", //飛車と左側(角のある側)の香
    "二枚落ち":"11l,21n,31s,41g,51k,61g,71s,81n,91l,13p,23p,33p,43p,53p,63p,73p,83p,93p",
    "三枚落ち":"11l,21n,31s,41g,51k,61g,71s,81n,13p,23p,33p,43p,53p,63p,73p,83p,93p",
    "四枚落ち":"21n,31s,41g,51k,61g,71s,81n,13p,23p,33p,43p,53p,63p,73p,83p,93p", //not implemented. returns Hirate
    "五枚落ち":"11l,21n,31s,41g,51k,61g,71s,81n,91l,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p", // not implemented. returns Hirate
    "左五枚落ち":"11l,21n,31s,41g,51k,61g,71s,81n,91l,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p",// not implemented. returns Hirate
    "六枚落ち":"31s,41g,51k,61g,71s,13p,23p,33p,43p,53p,63p,73p,83p,93p",
    "左七枚落ち":"11l,21n,31s,41g,51k,61g,71s,81n,91l,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p", //not implemented. returns Hirate
    "右七枚落ち":"11l,21n,31s,41g,51k,61g,71s,81n,91l,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p", // not implemented. returns Hirate
    "八枚落ち":"41g,51k,61g,13p,23p,33p,43p,53p,63p,73p,83p,93p", //
    "十枚落ち":"51k,13p,23p,33p,43p,53p,63p,73p,83p,93p",
    "その他":""
}

export const getSuperiorOnBoard= (line: string) =>
    handyCap.includes(line) ? handyCapArray[line] : "";




