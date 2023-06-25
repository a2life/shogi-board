/*
 *SFEN parser
 * parseSFEN(sfen:string) will return   [sob:string,gob:string,soh:string,goh:string,side:string s or g,count:number];,
 *  Shogi FEN string (SFEN from now on) consists of a single line of ASCII text containing four data fields,
 *  separated by whitespace. These are:
 *
 * Board state. The placement of the pieces of the board is written rank by rank, with each rank separated by a slash ('/').
 * The ranks are ordered from the white side, beginning with rank 'a' and ending with rank 'i' (using the standard English
 * shogi board coordinates). For each rank, the squares are specified from file 9 to file 1.
 * The uppercase letters "PLNSGBRK" are used for the non-promoted black pieces, while the lowercase letters "plnsgbrk" are
 * used for the non-promoted white pieces.
 * A promoted piece is denoted by a '+' character immediately before the piece letter, e.g. +B for a black promoted bishop.
 * One or more contiguous empty squares are represented by a digit counting the number of squares.
 * The side to move. This field contains of a single letter, "b" (for "black") or "w" (for "white"),
 * depending on the current side to move.
 * Pieces in hand.. Again we use uppercase letters for black pieces, and lowercase letters for white's captured pieces.
 * A digit before a letter means that there are several pieces of the given type in hand. The pieces are always listed
 * in the order rook, bishop, gold, silver, knight, lance, pawn; and with all black pieces before all white pieces.
 * As an example, in a position where black has one rook, one gold and four pawns in hand,
 * while white has two bishops, two silvers and three pawns, the pieces in hand data field in the SFEN would look like
 * "RG4P2b2s3p". If neither player has any pieces in hand, a single minus character ("-") is used for the pieces
 * in hand field.
 * Move count. An integer representing the number of the current move in the game. We are using the shogi convention for move
 * counting, which means that we count what international players would call "plies" or "half moves".
 * For instance, after the moves 1. P7g-7f 2. P8c-8d, the move counter is 3.
 * The "move count" data field is optional; a program should be able to read and understand an SFEN string even if this
 * field is missing.
 * As an example, the initial position in shogi is encoded like this:
 *
 * lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1
 * A more complicated example is the following position, taken from the 3rd game of the 19th Ryu-O match between
 * Sato and Watanabe:
 *
 *
 *   9    8    7    6    5    4    3    2    1
 * +----+----+----+----+----+----+----+----+----+
 * |    |    |    |    |    |    |    |    | Lw | a    1B 1G 1N 3P
 * +----+----+----+----+----+----+----+----+----+
 * |    | Lw |+Rb |    |    | Pb |    |    |    | b
 * +----+----+----+----+----+----+----+----+----+
 * | Pw |    |    | Pw | Bb | Gb |    | Pw | Pw | c
 * +----+----+----+----+----+----+----+----+----+
 * | Kw | Pw | Sw |    | Pw |    |    |    |    | d
 * +----+----+----+----+----+----+----+----+----+
 * | Nb | Nw |    | Pb |    |    | Gb |    |    | e
 * +----+----+----+----+----+----+----+----+----+
 * | Pb |    | Pb |    | Pb |    |    | Pb | Pb | f
 * +----+----+----+----+----+----+----+----+----+
 * |    | Pb | Sb |    |    |    |    |    |    | g
 * +----+----+----+----+----+----+----+----+----+
 * |    | Kb | Sb | Gb |    |    |    |+Rw |    | h
 * +----+----+----+----+----+----+----+----+----+
 * | Lb | Nb |    |    |+Pw |    |    |    | Lb | i    1S
 * +----+----+----+----+----+----+----+----+----+
 * The SFEN for the position above is:
 *
 * 8l/1l+R2P3/p2pBG1pp/kps1p4/Nn1P2G2/P1P1P2PP/1PS6/1KSG3+r1/LN2+p3L w Sbgn3p 124
 */

/**
 * Parse SFEN string
 * @param {string} sfen The sfen ascii string based on sfen protocol.
 *
 */
export const parseSFEN = (sfen: string) => {

    const [boardState, sideToMove, piecesOnHand, moveCount] = sfen.split(' ');
    // parse board State
    const rows = boardState.split('/');
    if (rows.length !== 9) Error('SFEN malformed. can not detect 9 rows');
    let rowNum = 0
    let arraySob = [] as string[], arrayGob = [] as string[]
    while (rowNum < 9) {
        processOnBoard(rows, rowNum, arraySob, arrayGob)
        rowNum += 1;
    }
    const sob = arraySob.join(',');
    const gob = arrayGob.join(',');
    // parse sideToMove
    const side = (sideToMove === 'b') ? 's' : 'g';
    //parse pieces on hand
    const [soh, goh] = processOnHand(piecesOnHand);
    // parse move count
    const count = Number(moveCount);

    return [sob, gob, soh, goh, side, count];
}

const processOnBoard = (rows: string[], rowNumber: number, arraySob: string[], arrayGob: string[]) => {

    let promoted = false;
    const row = rows[rowNumber] //get string for this row
    let colNum = 9;
    for (let i = 0; i < row.length; i++) {
        let t = row[i];
        switch (true) {
            case/[1-9]/.test(t):
                colNum = colNum - Number(t) + 1;
                break;
            case (t === '+'):
                promoted = true;
                break;
            case /[plngskrb]/.test(t):
                arrayGob.push(colNum.toString() + (rowNumber + 1).toString() + (promoted ? t.toUpperCase() : t));
                promoted = false;
                break;
            case /[PLNGSKRB]/.test(t):
                arraySob.push((colNum).toString() + (rowNumber + 1).toString() + (promoted ? t : t.toLowerCase()));
                promoted = false;
                break;
        }
        colNum = colNum - 1;
    }

}
const processOnHand = (onhand: string) => {
    const arraySoh = [] as string[]
    const arrayGoh = [] as string[]
    let repeater = 1;
    for (let char of onhand) {

        switch (true) {
            case/[1-9]/.test(char):
                repeater = Number(char);
                break;
            case /[a-z]/.test(char):
                for (let i = 0; i < repeater; i++) {
                    arrayGoh.push(char)
                }
                repeater = 1;
                break;
            case /[A-Z]/.test(char):
                for (let i = 0; i < repeater; i++) {
                    arraySoh.push(char.toLowerCase())
                }
                repeater = 1;
                break;
        }
    }
    return [arraySoh.join(','), arrayGoh.join(',')]
}