/**
 * data provider for image set locations
 */

 export const imgRoot = '/assets/img/'

const banImageArray=[
    "ban_dirty.png", //option 0
    "ban_gohan.png",
    "ban_kaya_a.png",
    "ban_kaya_b.png",
    "ban_muji.png",
    "ban_oritatami.png",
    "ban_stripe.png" //option 6
]

const masu_array = [
    "masu_dot.png",
    "masu_dot_xy.png",
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
    koma?:number,
    ban?:number,
    grid?:number,
    marker?:number
}

 export const boardImageSet = ({koma=5, ban=2, grid=1, marker=5}:DataSet={})=>{
     koma = (koma>=komaSetArray.length||koma<0)?5:koma; //number for
     ban = (ban>=banImageArray.length||ban<0)?2:ban  // screen number to existing image index
     grid = (grid>=masu_array.length||grid<0)?1:grid
     marker= (marker>=focus_array.length||marker<0)?5:marker

     return {"koma": imgRoot+'koma/'+komaSetArray[koma],
         'ban':imgRoot+`ban/`+banImageArray[ban],
         'grid':imgRoot+`masu/`+ masu_array[grid],
         'marker':imgRoot+`focus/`+focus_array[marker]
     }
 }

   export const  komaimagePath=(koma:number  )=> {
       koma = (koma>=komaSetArray.length||koma<0)?5:koma; //number for
       return komaSetArray[koma]

   }



