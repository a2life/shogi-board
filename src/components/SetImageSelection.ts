/**
 * data provider of image set locations
 */

export const imgRoot = '/assets/img/'

const banImageArray=[
    "ban_dirty.png", //option 0
    "ban_gohan.png",
    "ban_kaya_a.png",
    "ban_kaya_b.png",
    "ban_kaya_c.png",
    "ban_kaya_d.png",
    "ban_muji.png",
    "ban_oritatami.png",
    "ban_paper.png",
    "ban_paper_y.png",
    "ban_stripe.png" //option 10
]

const masu_array = [
    "masu_dot.png",
    "masu_dot_xy.png",
    "masu_dot_xya.png",
    "masu_handwriting.png",
    "masu_nodot.png",
    "masu_nodot_yx.png"
]

const focus_array =[
    "focus_thin_b.png", //option 0
    "focus_thin_g.png",
    "focus_thin_r.png",
    "focus_thin_y.png",
    "focus_trpt_b.png",
    "focus_trpt_g.png",
    "focus_trpt_r.png",
    "focus_trpt_y.png",
    "focus_bold_b.png",
    "focus_bold_g.png",
    "focus_bold_o.png",
    "focus_bold_r.png",
    "focus_bold_y.png",
    "focus_handwriting.png" //option 13
]
const komaSetArray = [
    'koma_dirty',  //option 0
    'koma_kinki',  //option1
    'koma_kinki_r',  //option2
    'koma_kinki_torafu',  //option 3
    'koma_ryoko',  //option 4
    'koma_ryoko_1',  // option 5
    'koma_ryoko_torafu',  //option 6
    'koma_hidetchi' //option 7
]

export interface DataSet {
    [index:string]:any
    koma?:number,
    ban?:number,
    grid?:number,
    marker?:number
}

export interface graphicsSet {
    koma:string,
    ban:string,
    grid:string,
    marker:string
}

export const buildGraphicPaths = (graphicsOptions: DataSet): graphicsSet => {
    const { koma, ban, grid, marker } = boardImageSet(graphicsOptions);
    return { koma, ban, grid, marker };
}

function getImage(type:string,index:number,array:string[], defaultIndex:number ):string{
    if (index>=array.length || index <0) index=defaultIndex;
    return imgRoot + type + '/'+array[index]
}
export const boardImageSet = ({koma=5, ban=2, grid=1, marker=5}:DataSet={})=>{

    return {
        "koma": getImage('koma', koma, komaSetArray, 5),
        'ban': getImage('ban', ban, banImageArray, 2),
        'grid': getImage('masu', grid, masu_array, 1),
        'marker': getImage('focus', marker, focus_array, 5),
    }
 }





