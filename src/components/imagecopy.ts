/*
copy image
 */
import domtoimage from 'dom-to-image';

export const saveImage = (node:HTMLElement,filename:string)=>{
    domtoimage.toBlob(node)
        .then(function (blob){
            window.saveAs(blob, filename)
        })


}