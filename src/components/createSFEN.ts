/**
 * Create SFEN string from pieces information that exists in board render
 */
/*
if move counter is odd, then Sente(Black) Otherwise Gote(White)
 */
const isupperCase = (a: string) => /^[A-Z]*$/.test(a);
export const createSFEN = (pieces: string, moveCounter: number) => {
    const board = new Array(9).fill(undefined).map(() => new Array(9).fill(undefined));
    // this is row, column indexing -1
    const onHands: any = {};
    const onBoardPattern = /([sg])(\d)(\d)(\D)/;
  //  const onHandPattern = /[sg][rbgsnlp][SG]\D/;  //this test is not necessary as if string does not match onBoardPattern, it is assumed the string is onHandPattern
    const onHandPieces = ['R', 'B', 'G', 'S', 'N', 'L', 'P', 'r', 'b', 'g', 's', 'n', 'l', 'p'];
    //initialize onHands object
    onHandPieces.forEach(el => {
        onHands[el] = 0
    });


    pieces.split(',').forEach(el => {
        const boardMatched = el.match(onBoardPattern);
        if (boardMatched) { //index 1 is s or g index 2 is column index 3 is row.
            const col = Number(boardMatched[2]) - 1
            const row = Number(boardMatched[3]) - 1
            const piece = isupperCase(boardMatched[4]) ? "+" + boardMatched[4] : boardMatched[4];
            board[row][col] = (boardMatched[1]) == 's' ? piece.toUpperCase() : piece.toLowerCase();
        } else {
            let piece = el.substr(1, 1)
            piece = (el.substr(2, 1) == "S") ? piece.toUpperCase() : piece.toLowerCase();
            onHands[piece] += 1;
        }
    });
    //console.log(board);
    let boardStringArr: string[] = [];
    let emptyCounter = 0
    let lineString = ''
    for (let row = 0; row < board.length; row++) {
        lineString = ''
        emptyCounter = 0
        for (let col = 8; col >= 0; --col) {
            if (board[row][col] == undefined) {
                emptyCounter++
            } else {
                if (emptyCounter) {
                    lineString += emptyCounter.toString();
                    lineString += board[row][col];
                    emptyCounter = 0;
                } else {
                    lineString += board[row][col]
                }
            }
        }
        if (emptyCounter > 0) lineString += emptyCounter.toString();
        boardStringArr[row] = lineString;
    }
    const boardString = boardStringArr.join('/')
    // console.log('boardString: ', boardString);
    /**
     * The code below will go through onHands object with item key. if value is 0, do nothing.
     * if value is one, just add key. if value is more than one, then add key value(number) and key
     */
    let onHandString=onHandPieces.reduce((carry,item)=>{
        switch (onHands[item]){
            case 0: return carry;
            case 1: return carry + item;
            default: return  carry+(onHands[item].toString()+item)

        }
    },"")
    if (onHandString == "") onHandString = '-'
    const turn = moveCounter + 1, side = (turn % 2 == 0) ? 'w' : 'b';
    return `${boardString} ${side} ${onHandString} ${turn}`;
}