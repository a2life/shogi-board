import {KifuParser} from "./KifuParser";

/**
 *  Returns Kifu string as promise, from a file pointed by url
 * @param url web file path to the target kifu file. Supports SJIS and utf-8 encoded Kaiknoki style kifu file.
 */

export const getUrlKifu = async (url:string)=> {

    const response = await fetch(url);
    let arrayBuffer= await response.arrayBuffer()
    const kifu=processText(arrayBuffer)
    const data = new KifuParser(kifu);
    return data.parse();

}
const processText=(buffer:ArrayBuffer)=>{
    const encoding = (contentIsSJIS(buffer))?"Shift_JIS":"utf-8"
    const textDecoder = new TextDecoder(encoding)
  //  console.log(encoding)
    return textDecoder.decode(buffer)
}


// this sJIS sniffing code is borrowed from Encoding-japanese by polygonPlanet

const contentIsSJIS=(buffer:ArrayBuffer)=> {
    const data = new Uint8Array(buffer)
    let i = 0, len = data && data.length, b;
    while (i < len && data[i] > 0x80) {
        if (data[i++] > 0xFF) {
            return false;
        }
    }

    for (; i < len; i++) {
        b = data[i];
        if (b <= 0x80 || (0xA1 <= b && b <= 0xDF)) {
            continue;
        }

        if (b === 0xA0 || b > 0xEF || i + 1 >= len) {
            return false;
        }

        b = data[++i];
        if (b < 0x40 || b === 0x7F || b > 0xFC) {
            return false;
        }
    }
    return true;
}
