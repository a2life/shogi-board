import {Board} from "./components/ShogiBoard";
import {defaultParams, ShogiKit} from "./components/defaults";
import {unifyPieces, preProcessMoves, prepBranchPoints, extractComments} from "./components/utils";
import {KifuParser} from "./components/KifuParser";
import {buildGraphicPaths, DataSet} from "./components/SetImageSelection";
import {parseSFEN} from "./components/SfenParser";
import {useState, useEffect} from "preact/hooks";
import {getUrlKifu} from "./components/fetchFile";

/**
 * Renders a Shogi board with the given setup.
 *
 * @param prop - The setup object.
 * @param prop.setup - The Shogi kit setup.
 * @param prop.setup.koma - The koma image path.
 * @param prop.setup.ban - The ban image path.
 * @param prop.setup.grid - The grid image path.
 * @param prop.setup.marker - The marker image path.
 * @param prop.setup.startAt - The starting position of the kifu.
 * @param prop.setup.smooth - Whether to animate the moves.
 * @param prop.setup.sOnBoard - The sente pieces on the board.
 * @param prop.setup.sOnHand - The sente pieces on hand.
 * @param prop.setup.gOnBoard - The gote pieces on the board.
 * @param prop.setup.gOnHand - The gote pieces on hand.
 * @param prop.setup.comment - The initial comment.
 * @param prop.setup.markerAt - The marker position.
 * @param prop.setup.sfen - The SFEN string.
 * @param prop.setup.kifu - The kifu string.
 * @param prop.setup.url - The URL of the kifu file.
 * @param prop.index - The index of the board renderer.
 *
 * @returns The rendered Shogi board.
 */
export function BoardRenderer(prop: { setup: ShogiKit, index: number }) {
    const [urlData, setUrlData] = useState({})
    let kifuDataPack = {} // stuff dataPack in case kifu is available
    let sfenData = {}
    let propTranslate: {
        [index: string]: any,
        tesuu?: number, animate?: boolean,
        senteOnBoard?: string, senteOnHand?: string,
        goteOnBoard?: string, goteOnHand?: string,
        initialComment?: string
        showMarker?: boolean
        maskBranch?: boolean
    } = {} //prop conversion
    // need to write a object to filter boardImageSet parameters

    let graphicsOptions: DataSet = {};
    const keysToCopy = ['koma', 'ban', 'grid', 'marker']
    for (const key of keysToCopy) {
        if (key in prop.setup) {
            graphicsOptions[key] = prop.setup[key]
        }
    }

    // --- here, do something to build options
    const {koma, ban, grid, marker} = buildGraphicPaths(graphicsOptions) // get all reference to images path. OK if its empty object

    const xlationMap = {
        'startAt': 'tesuu',
        'smooth': 'animate',
        'sOnBoard': 'senteOnBoard',
        'gOnBoard': 'goteOnBoard',
        'sOnHand': 'senteOnHand',
        'gOnHand': 'goteOnHand',
        'comment': 'initialComment'
    }
    Object.entries(xlationMap).forEach(([propkey, xlatekey]) => {
        if (propkey in prop.setup) propTranslate[xlatekey] = prop.setup[propkey]
    })


    if ('markerAt' in prop.setup) prop.setup.showMarker = true;

    if (!!prop.setup.sfen) {
        const [sob, gob, soh, goh, side, count] = parseSFEN(prop.setup.sfen);
        sfenData = {senteOnHand: soh, goteOnHand: goh, senteOnBoard: sob, goteOnBoard: gob}
    }

    if (!!prop.setup.kifu) {
        const data = new KifuParser(prop.setup.kifu)
        kifuDataPack = data.parse();

    }
    /**
     *
     * @param url :string url path to the kifu. assumes the file pointed to by url is a text file in kifu format
     * file content need to be either utf8 or s-jis encoded.
     */

    useEffect(() => {
        if (!!prop.setup.url) {
            // if url is set, fetch kifu after component is mounted and force rerender.
            getUrlKifu(prop.setup.url).then((result) => setUrlData(result));

        }
    }, [])

    //otherwise fall back to individual parameters that are available
    let {
        senteOnBoard,
        goteOnBoard,
        senteOnHand,
        goteOnHand,
        markerAt,
        caption,
        initialComment,
        moves,
        tesuu,
        kifu,
        senteName,
        goteName,
        showMarker,
        animate,
        flip,
        maskBranch,
        maskBranchOnce,
        sideComment
    }
        = {...defaultParams, ...propTranslate, ...sfenData, ...kifuDataPack, ...urlData, ...prop.setup,} //each array set will override if variable exists.

    const unifiedPieces = unifyPieces(senteOnBoard, goteOnBoard, senteOnHand, goteOnHand);
    moves = moves || ``;
    initialComment = initialComment || '';

    let {movesArray, lineZeroComment} = preProcessMoves(moves);
    //   console.log(movesArray);


    const commentWindow: boolean = (movesArray.toString().replaceAll("***?***", "").indexOf('*')) > 0 || initialComment.length > 1; //
    //if moves array includes the ***comment*** section except for ***?*** which is used to signal masked next branch instruction, or initial comment
    //exists (but string length is more than 1), then commentWindow flag is true.
    initialComment = (initialComment.length > 0) ? `${initialComment}\n${extractComments(lineZeroComment)}` : extractComments(lineZeroComment);


    const branchList = prepBranchPoints(movesArray)
    //   console.log('branchList',branchList)


    // check for existence of comments.
    // console.log("commentWindows:",commentWindow, "index",prop.index);
    const HasBranch: boolean = (movesArray && (movesArray.toString().match(/\dJ\d/) || []).length > 0); //check for Branch instruction
    return <Board pieces={unifiedPieces} moves={movesArray} branchList={branchList} caption={caption || ""}
                  initialComment={initialComment} tesuu={tesuu || 0}
                  flags={{commentWindow, HasBranch, showMarker, animate, flip, maskBranch, maskBranchOnce, sideComment}}
                  kifu={kifu}
                  senteName={senteName} goteName={goteName} markerAt={markerAt} graphics={{koma, ban, grid, marker}}
                  id={prop.index}/>
}
