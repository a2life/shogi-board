// kifu parser class
/*
Pattern to be recognized
開始日時：2021/07/23 1:00:00
終了日時：2021/07/23 2:14:00
棋戦：朝日杯将棋オープン戦
場所：関西将棋会館
持ち時間：40分
消費時間：76▲40△31
手合割：平手
先手：浦野真彦 八段
後手：阪口　悟 六段
戦型：三間飛車
手数----指手---------消費時間--
 */
/*
# ---- Kifu for Windows V7 V7.44 棋譜ファイル ----
    開始日時：2020/07/08 22:29:03
手合割：その他
上手の持駒：なし
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
| ・ ・ ・ ・ ・v玉 ・v桂v香|一
| ・ ・ ・ ・ ・ ・v金 ・ ・|二
| ・ ・ ・ ・ ・v歩 ・v歩v歩|三
| ・ ・ ・ ・ ・ ・ ・ ・ ・|四
| ・ ・ ・ ・ ・ ・ ・ ・ ・|五
| ・ ・ ・ ・ ・ ・ ・ ・ ・|六
| ・ ・ ・ ・ ・ ・ ・ ・ ・|七
| ・ ・ ・ ・ ・ ・ ・ ・ ・|八
| ・ ・ ・ ・ ・ ・ ・ ・ ・|九
+---------------------------+
下手の持駒：飛　角　桂　歩二
下手番
下手：
上手：

 */
/*
How do I implement bookmark?
Bookmark starts at the very beginning of line, so it will be \n followed by & catch that,
then tack it to the end of previous line with unique tag.  my choice.  how about &&&bookMarkName&&&
So in the meantime, I will change comment format to ***comment***
*/

import {getSuperiorOnBoard} from "./teai";

const lookupList = [
    {key: "10", pat: /＋\s/},
    {key: "1", pat: /十/g},
    {key: "1", pat: /[１一]/g},
    {key: "2", pat: /[二２]/g},
    {key: "3", pat: /[三３]/g},
    {key: "4", pat: /[四４]/g},
    {key: "5", pat: /[五５]/g},
    {key: "6", pat: /[六６]/g},
    {key: "7", pat: /[七７]/g},
    {key: "8", pat: /[八８]/g},
    {key: "9", pat: /[九９]/g},
    {key: "p", pat: /歩/g},
    {key: "P", pat: /と/g},
    {key: 'L', pat: /成香|杏/g},
    {key: "l", pat: /香/g},
    {key: 'N', pat: /成桂|圭/g},
    {key: 'n', pat: /桂/g},
    {key: 'S', pat: /成銀|全/g},
    {key: 's', pat: /銀/g},
    {key: 'r', pat: /飛/g},
    {key: "R", pat: /[竜龍]/g},
    {key: "b", pat: /角/g},
    {key: "B", pat: /馬/g},
    {key: "k", pat: /[玉王]/g},
    {key: "g", pat: /金/g},
    {key: "00", pat: /同　?/},
    {key: "d", pat: /打/},
    {key: "J", pat: /\+/},
    {key: "", pat: /左|右|引|直|行|不成|上|下/g},　//These words will be ignored (redundant with coordination already available) ignore 不成　before checking for  成
    {key: "+", pat: /成/},
    {key: "x", pat: /(投了|中断|詰み|不詰|持将棋|千日手|反則勝ち|反則負け|入玉勝ち)/},
    {key: " ", pat: /　/g} //replace zenkaku space with hankaku space

]
const boardMarker = "９ ８ ７ ６ ５ ４ ３ ２ １";
const senteOnHandPattern = /\n先手の持駒：([^\n]*)[\r\n$]/;
const shimoteOnHandPattern = /\n下手の持駒：([^\n]*)[\r\n$]/;
const goteOnHandPattern = /\n後手の持駒：([^\n]*)[\r\n$]/;
const uwateOnHandPattern = /\n上手の持駒：([^\n]*)[\r\n$]/;
const startDatePattern = /\n開始日時：([^\n]*)[\r\n$]/;
const endDatePattern = /\n終了日時：([^\n]*)[\r\n$]/;
const teaiPattern = /\n手合割：([^\n]*)[\r\n$]/;
const senteNamePattern = /先手：([^\n]*)[\r\n$]/;
const shimoteNamePattern = /下手：([^\n]*)[\r\n$]/;
const goteNamePattern = /後手：([^\n]*)[\r\n$]/;
const uwateNamePattern = /上手：([^\n]*)[\r\n$]/;
const boardFlipPattern = /.*盤面回転/;
const gotebanPattern = /.*後手番/;
const uwatePattern = /.*上手番/;
const locationPattern = /場所：([^\n]*)[\r\n$]/
const timeAllowedPattern = /持ち時間：([^\n]*)[\r\n$]/
const timeSpentPattern = /消費時間：([^\n]*)[\r\n$]/
const eventPattern = /棋戦：([^\n]*)[\r\n$]/
const catalogingPattern = /戦型：([^\n]*)[\r\n$]/
const movesHeaderPattern = '\n手数----指手';
const movesPattern = /(\d+)\s+([\w+]+)(?:\((\d+)\))?[ /():0-9]*(J?)(\*?[^\n]*)|変化：(\w+)|.*/ //move line here is already processed with lookups
const moveName = /\d+\s+([\S　]*)/ //this regex applied to original move line with Kanji and extract move information (strip off time etc.,) .

export class KifuParser {
    kifu: string
    moves: string[] = []
    sOnHand: string = ''
    gOnHand: string = '';

    senteName = '';
    goteName = "";
    teai = '';
    startDate = '';
    endDate = '';
    location = '';
    event = '';
    timeAllowed = '';
    timeSpent = '';
    catalog = '';
    boardFlip = false;
    sOnBoard = "19l,29n,39s,49g,59k,69g,79s,89n,99l,28r,88b,17p,27p,37p,47p,57p,67p,77p,87p,97p"; //default for 平手
    gOnBoard = "11l,21n,31s,41g,51k,61g,71s,81n,91l,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p";
    goteban = 0;


    constructor(kifu: string) {
        this.kifu = kifu
        this.moves = []

        if (kifu.includes(movesHeaderPattern)) { //header part exists, so
            const headerPart = kifu.slice(0, kifu.search(movesHeaderPattern) + 1) //limit header part up to headerPattern
            // +1 to back up linebreak. Otherwise, the last line will not have carriage return and will not
            //match with goteName pattern, which is usually the last attribute before header pattern
            //  console.log(headerPart)
            this.parseData(headerPart)
            this.parseMoves(kifu) // if header pattern exists, then moves part exists.
        } else this.parseData(kifu) //kifu with no moves involved.

    }

    parseData(kifu: string) {
        const findMatch = (pattern: RegExp) => {
            return (!!kifu.match(pattern)) ? kifu.match(pattern)![1].trim() : ""
        }
        if (kifu.match(senteOnHandPattern) !== null) this.sOnHand = kifu.match(senteOnHandPattern)![1].trim()
        else if (kifu.match(shimoteOnHandPattern) !== null) this.sOnHand = kifu.match(shimoteOnHandPattern)![1].trim()
        if (kifu.match(goteOnHandPattern) !== null) this.gOnHand = kifu.match(goteOnHandPattern)![1].trim()
        else if (kifu.match(uwateOnHandPattern) !== null) this.gOnHand = kifu.match(uwateOnHandPattern)![1].trim()
        this.startDate = findMatch(startDatePattern)
        this.endDate = findMatch(endDatePattern)
        this.teai = findMatch(teaiPattern)
        const superiorOnBoard = getSuperiorOnBoard(this.teai);
        if (superiorOnBoard.length > 0) this.gOnBoard = superiorOnBoard;//overwrite gOnBoard in case teai exits.

        this.event = findMatch(eventPattern)
        this.location = findMatch(locationPattern)
        this.catalog = findMatch(catalogingPattern)
        this.timeAllowed = findMatch(timeAllowedPattern)
        this.timeSpent = findMatch(timeSpentPattern)
        // console.log('teai',this.teai)
        if (kifu.match(senteNamePattern) !== null) this.senteName = kifu.match(senteNamePattern)![1]
        else if (kifu.match(shimoteNamePattern) !== null) this.senteName = kifu.match(shimoteNamePattern)![1]
        if (kifu.match(goteNamePattern) !== null) this.goteName = kifu.match(goteNamePattern)![1]
        else if (kifu.match(uwateNamePattern) !== null) this.goteName = kifu.match(uwateNamePattern)![1]


        this.boardFlip = (kifu.search(boardFlipPattern) >= 0)

        this.goteban = superiorOnBoard.length + kifu.search(gotebanPattern) + kifu.search(uwatePattern) >= 0 ? 1 : 0
        // console.log('goteban',this.goteban)
        //goteban is 1 if handicap game is specified or goteban or uwateban directive is specifically called out
        // result of calculation area is -2 if no match and superiorOnBoard="" so >=0 is correct operation.
        const KifuArray = kifu.split('\n');
        const i = this.findLine(boardMarker, KifuArray)
        // console.log('i=', i)

        if (i >= 0) { //the string contains board chart
            this.sOnBoard = ''; //reset default onBoard information
            this.gOnBoard = '';
            let startRow = i + 2;//starting row of 局面　info
            let endRow = startRow + 9 //ending row of 局面　info
            for (let row = startRow; row < endRow; row++) {
                for (let k = 2; k < 19; k = k + 2) {
                    let masu = KifuArray[row].substr(k, 1)
                    if (masu !== "・") {
                        let colRow = (10 - k / 2).toString() + (row - startRow + 1).toString();
                        let side = KifuArray[row].substr(k - 1, 1);
                        switch (side) {
                            case " "://This is Sente's piece
                                this.sOnBoard += colRow;
                                this.sOnBoard += masu;
                                this.sOnBoard += " ";
                                break;
                            case "v"://this is Gote's piece
                                this.gOnBoard += colRow;
                                this.gOnBoard += masu;
                                this.gOnBoard += " "
                                ;
                                break;
                        }
                    }
                }
            }

            this.sOnBoard = this.sOnBoard.trim();
            this.gOnBoard = this.gOnBoard.trim();


            for (const elem in lookupList) {
                const pat = lookupList[elem].pat
                const key = lookupList[elem].key
                this.sOnBoard = this.sOnBoard.replace(pat, key);
                this.gOnBoard = this.gOnBoard.replace(pat, key);
                this.sOnHand = this.sOnHand.replace(pat, key);
                this.gOnHand = this.gOnHand.replace(pat, key);
            }
            //spell out pieces and not numbers. ie., s3 -> s,s,s

            /*   this.sOnHand = this.parseRepeat(this.sOnHand);
               this.gOnHand = this.parseRepeat(this.gOnHand);*/
            this.sOnBoard = this.sOnBoard.split(' ').join(',');
            this.gOnBoard = this.gOnBoard.split(' ').join(',');
            this.sOnHand = this.sOnHand.split(' ').join(',')
            this.gOnHand = this.gOnHand.split(' ').join(',')


        }


        /*
          // the following code printed out the board layout for debugging purpose
        for ($n=$i;$n<$j;$n++){
            $m= mb_strlen($init_array[$n]);
            for($k=0;$k<$m;$k++){
                echo "($k):".mb_substr($init_array[$n],$k,1)."|";
            }
            echo "\n";
        }

}

         */
    }

    parseMoves(kifu: string) {  //parse moves and extract line 0 comment, if it exists.
        if (kifu.search(movesHeaderPattern)) {
            const movesArray2 = kifu.slice(kifu.search(movesHeaderPattern), kifu.length)
                .replace(/\n\*(.*)/g, '***$1***') //tack comment only line(s) except for the 1st line comment to previous move for later processing
                .replace(/\n&(.*)/g, '&&&$1&&&') //tack bookmark line(s) to previous move for later processing
                .replace(/\n(まで.*)/g, "===$1===")
                .split('\n');//tack away end of move wording
            //     console.log('movesArray2',movesArray2)
            const commentLine = movesArray2.slice(1, 2).toString()
            const commentSearch = commentLine.slice(commentLine.search(/\*\*\*/)); // if no comment, then '-' will be returned ie., slice(-1)
            const comment = (commentSearch.length > 1) ? commentSearch : '';
            //     console.log('comment:',comment)
            const movesArray = movesArray2.slice(2).filter((e) => e !== '') //create array with moves section
            //  console.log('movesArray=', movesArray)
            this.moves = movesArray.map((line) => {
                line = line.trim()
                let lines = line.split('***'); //separate comment section and preserve it for later display
                //todo this split does not consider &&& bookmarker. Need to implement this.
                let lineXlated = lines[0]; //and only translate first section

                for (const elem in lookupList) {
                    const pat = lookupList[elem].pat

                    const key = lookupList[elem].key
                    lineXlated = lineXlated.replace(pat, key);

                }
                lines[0] = lineXlated;

                const found = (lines.join("***")).match(movesPattern)
                //console.log('found', found)

                let parsed;
                if (!!found![2]) {
                    const count = found![1]
                    const side = ((parseInt(found![1]) + this.goteban) % 2 === 1) ? 's' : 'g'
                    //   console.log(parseInt(found![1]))
                    //    console.log('this.goteban',this.goteban)
                    //    console.log('side', side);
                    const to = found![2].trim();

                    const from = (!!found![3]) ? found![3] : ""
                    const note = (!!found![4]) ? found![4] : "=" // note is "J" or "="
                    const comment = (!!found![5]) ? found![5].trim() : ''
                    const name = line.match(moveName)![1].split('*')[0] // get original notation for display window. Remove anything trailing comment separator
                    if (to === 'x') { // in case of 投了、中断、etc., give different treatment
                        parsed = to + ':' + name + comment
                    } else { //otherwise, parse movement further
                        parsed = side + '-' + to + from + note + count + ':' + name + comment
                        parsed = parsed.replace(/-(...)\+/, '+$1') // s-nn+ => s+nn
                        parsed = parsed.replace(/-(...)d/, 'd$1') // s-68sd => sd68s
                        parsed = parsed.replace(/([+-]\d\d)[pPlLnNsSgkrRbB]/, '$1')// remove piece information

                    }


                } else if (!!found![6]) {
                    parsed = 'C:' + found![6]
                } else
                    parsed = found![0]


                return parsed


            })
            if (comment.length > 0) this.moves = [comment, ...this.moves]
        } else this.moves = ['']
    }

    findLine(target: string, scrArray: string[]) {
        return scrArray.findIndex((e) => e.includes(target));
    }

    /**
     *  return expanded string array such as 'b,l,p,p,p'
     * @param onHand; onHand data such as "b,l,p3"
     */

    /*parseRepeat(onHand: string) {

        let hands = ""
        if (onHand.length === 0) return hands
        let regs: string[] = []
        const pattern = /(([plnsgrb])(\d*))/g
        const found = onHand.match(pattern) // return ["l2','p','b'] etc.,"
        found!.forEach((e) => {
            if (e.length === 1) regs.push(e)
            else for (let x = 0; x < parseInt(e[1]); x++) regs.push(e[0]);
        })
        return regs.join(',');

    }

*/
    public parse() {
        let returnObject = {
            senteOnBoard: this.sOnBoard,
            goteOnBoard: this.gOnBoard,
            senteOnHand: this.sOnHand,
            goteOnHand: this.gOnHand,
            senteName: this.senteName,
            goteName: this.goteName,
            teai: this.teai,
            flip: this.boardFlip,
            //       startDate: this.startDate,
            //        endData: this.endDate,
            //       eventName: this.event,
            //       catalog: this.catalog,
            kifu: this.kifu,

        }
        if (this.moves.length > 0) returnObject = {...returnObject, ...{moves: this.moves}}

        return returnObject
    }
}

