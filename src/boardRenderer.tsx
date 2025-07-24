import {Board} from "./components/ShogiBoard";
import {defaultParams, ShogiKit} from "./components/defaults";
import {unifyPieces, preProcessMoves, prepBranchPoints} from "./components/utils";
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
 * @param prop.input - element id input box that houses JSON data.
 *
 *
 * @returns The rendered Shogi board.
 */
export function BoardRenderer(prop: { setup: ShogiKit, index: number, input: string }) {
    const [urlData, setUrlData] = useState({})
    const [jsonInput, setJsonInput] = useState({})
    const getJsonInput = (elementId: string) => {
        if (elementId == '') return {}
        const source = document.getElementById(elementId) as HTMLInputElement;
        return JSON.parse(decodeURIComponent(source.value)) as ShogiKit
    }


    const inputHandler = (e: Event) => {
        setUrlData({}) //remove urlData if exists
        sfenData = {} //remove sfenData if exists
        e.preventDefault();
        setJsonInput(getJsonInput(prop.input))

    }

    if (Object.keys(jsonInput).length > 0) prop.setup = {...jsonInput} as ShogiKit
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
        sfenData = {moves: [], senteOnHand: soh, goteOnHand: goh, senteOnBoard: sob, goteOnBoard: gob}

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
        // if url is set, fetch kifu after component is mounted and force rerender.
        sfenData = {}    //remove existing data if exists
        kifuDataPack = {} //remove previous data if exists
        if (!!prop.setup.url) { //check if url is set to null. in this case, skip the fetch
            getUrlKifu(prop.setup.url!).then((result) =>
                setUrlData(result))
        }
    }, [prop.setup.url])

    /*
    The Calculated and manupulated entities with this modules are below. Rest is path through
    senteOnBoard, goteOnBoard,senteOnHand,goteOnHand, tesuu,kifu,sentename,gotename,flip

    URL param will alter all of the above.
    Kifu param will alter all of the above
    sfen param will alter first four

    The params that are not affected are
    markerAt, caption,initialComment, showMarker, animate,maskbranch,maskbranchonce,sidecomment
     */
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
        = {
        ...defaultParams,
        ...propTranslate,
        ...kifuDataPack,
        ...urlData,
        ...sfenData,
        ...prop.setup,
    } //each array set will override if variable exists.


    const unifiedPieces = unifyPieces(senteOnBoard, goteOnBoard, senteOnHand, goteOnHand);

    initialComment = initialComment || '';
    let {movesArray, lineZeroComment} = preProcessMoves(moves!);


    //if moves array includes the ***comment*** section except for ***?*** which is used to signal masked next branch instruction, or initial comment
    //exists (but string length is more than 1), then commentWindow flag is true.
    let commentWindow = initialComment.length > 1
    for (const move of movesArray) {
        if (move.comment) commentWindow = true
    }
    initialComment = (initialComment.length > 0) ? `${initialComment}\n${lineZeroComment}` : lineZeroComment;


    const branchList = prepBranchPoints(movesArray)
    //console.log('branchList', branchList)
    /*
    When the data-input attributes exist in target div, additional input box will be added. The input box is hidden but can be accessed from outside
    If the app by usual document.getElementById(data-input-value) and fire with dispatchEvent('change');
    */
    //   const HasBranch: boolean = (movesArray && (movesArray.toString().match(/\dJ\d/) || []).length > 0); //check for Branch instruction
    const HasBranch = branchList && Object.keys(branchList).length > 0
    return <div class="app-container"><Board pieces={unifiedPieces} moves={movesArray} branchList={branchList}
                                             caption={caption || ""}
                                             initialComment={initialComment} tesuu={tesuu || 0}
                                             flags={{
                                                 commentWindow,
                                                 HasBranch,
                                                 showMarker,
                                                 animate,
                                                 flip,
                                                 maskBranch,
                                                 maskBranchOnce,
                                                 sideComment
                                             }}
                                             kifu={kifu}
                                             senteName={senteName} goteName={goteName} markerAt={markerAt}
                                             graphics={{koma, ban, grid, marker}}
                                             id={prop.index}/>
        {prop.input && <input id={prop.input} onChange={inputHandler} style="display:none"></input>}
    </div>
}
