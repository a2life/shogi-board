import {KifuParser} from "./KifuParser";

export const getUrlKifu = async (url:string)=> {

    const response = await fetch(url);
    const kifu = await response.text();
    const data = new KifuParser(kifu);
    return data.parse();

}