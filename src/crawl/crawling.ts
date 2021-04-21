const axios = require("axios");
const cheerio = require("cheerio");

export const crawling = async () => {
    let textList: any = []; 
    const html = await axios.get("https://software.sookmyung.ac.kr/software/5911/subview.do");
    const $ = cheerio.load(html.data);
    const $bodyList = $("li.thumbLi").children("a.artclLinkView");
    $bodyList.each((i : any, elem: any) => {
        textList[i] = {
            title: $(elem).find('div.artclTitle strong').text(),
            urlInfo: "https://software.sookmyung.ac.kr"+ $(elem).attr('href'),
            date: $(elem).find('dl._artclregDate dd').text().trim()
        };
    }); 
    return textList;
}
