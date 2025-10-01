/**
 * CreateBOD
 * @var pieces:string piece information in forms of s34g,g11l etc., with onHand pieces info formed like sbSb gpGp
 * @var senteName:string name of Sente if exists otherwise undefined
 * @var goteName:string name of gote if exits otherwise empty undefined
 * @var moveCount:number
 * @var lastMove:string Last move information that only exists undefined

 *
 * returns BOD string
 */

export const createBOD = (pieces: string,  senteName:string|undefined,goteName:string|undefined, moveCount:number, lastMove:string) => {
    const cordinationLine="  ９ ８ ７ ６ ５ ４ ３ ２ １"
    const horizontalBorder="+---------------------------+"
    const verticalBorder="|"
    const rowNumber ="一二三四五六七八九"
    const kanNumber=['','一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八']
    const board: string[][] = new Array(9).fill(undefined).map(() => new Array(9).fill(' ・'))
    const onHand:{[key:string]:{[key:string]: number}} = {
        's': {
            'r': 0, 'b': 0, 'g': 0, 's': 0, 'n': 0, 'l': 0, 'p': 0
        },
        'g': {
            'r': 0, 'b': 0, 'g': 0, 's': 0, 'n': 0, 'l': 0, 'p': 0
        }
    }
    const pieceTable: {[key:string]:string} =
     {
        "p": ' 歩',
        "P": ' と',
        'l': ' 香',
        'L': ' 杏',
        'n': ' 桂',
        'N': ' 圭',
        's': ' 銀',
        'S': ' 全',
        'r': ' 飛',
        'R': ' 竜',
        'b': ' 角',
        'B': ' 馬',
        'k': ' 玉',
        'g': ' 金',

    }

    const stringifyOnHand=(onHand: {[key:string]: number})=> {
        let acc=""
        for (let[key,value] of Object.entries(onHand)) {
            if (value >0) {
                acc+=pieceTable[key]
                if (value>1){
                    acc+=kanNumber[value]
                }
              //  acc+='　'
                acc+='\u3000'
            }
        }
        if (acc.length==0){
            acc="なし"
        }
        return acc.split(' ').join('') //remove space character
    }
    pieces.split(',').forEach((piece: string) => {
        const [side, column, row, kind] = piece.split('')
        if ('plnsgrb'.includes(column)) {
           onHand[side][kind]+=1

        } else {
            board[Number(row)-1][9-Number(column)] = pieceTable[kind]
            if (side == 'g')
                board[Number(row)-1][9-Number(column)]=board[Number(row)-1][9-Number(column)].replace(' ', 'v')
        }

    })

// build string
    const boardStringArray=[]
    if (goteName) boardStringArray.push("後手："+goteName)
    boardStringArray.push("後手の持駒："+stringifyOnHand(onHand['g']))
    boardStringArray.push(cordinationLine)
    boardStringArray.push(horizontalBorder)
    board.forEach((row,index)=>{
        boardStringArray.push(verticalBorder+row.join('')+verticalBorder+rowNumber[index])
    })
    boardStringArray.push(horizontalBorder)
    if(senteName) boardStringArray.push("先手："+senteName)
    boardStringArray.push("先手の持駒："+stringifyOnHand(onHand['s']))
    if(lastMove.length>0) lastMove=lastMove.split('.')[1]
    boardStringArray.push(`手数＝${moveCount}  ${lastMove}  まで`)

    return boardStringArray.join('\n')
}