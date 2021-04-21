import { WebClient } from '@slack/web-api';
import Router from 'koa-router';
import CONFIG from '../../config/bot.json';
import { crawling  } from '../crawl/crawling';
import qs from 'qs';
// const token : string = CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN;
const verification : string = CONFIG.VERIFICATION_TOKEN;   //개발용 token
const clientId : string = process.env.SLACK_CLIENT_ID || '';
const clientSecret : string = process.env.SLACK_CLIENT_SECRET || '';  //환경 변수 bot client 정보
const axios = require("axios");
const api = new Router();
let oauthToken: string = '';
let web = new WebClient(oauthToken);

api.get('/auth', async (ctx : { body: any , status: number, request: any, query: any}) => {
    if(!ctx.query.code){
        return; //접근 거부
    }
    const response = await axios({
        method: 'post',
        url: 'https://slack.com/api/oauth.v2.access',
        data: qs.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: ctx.query.code
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
    })  //distribution 시 verification
    console.log(response.data);
    if(response){
        if(response.data.ok == true){
            oauthToken = response.data.access_token;    //워크 스페이스 token 저장
        } else {
            ctx.body = response.error;
            ctx.status = 401;
            return;     //올바르지 않은 form 전송 시 return
        }
    }
    ctx.status = 200;
});

api.post('/slack/events', async(ctx : { body: any , status: number, request: any}) => {
    const body : any = ctx.request.body;
    if(body.type === 'url_verification'){
        //url 검증
        ctx.body = body.challenge;
    } else if(body.type === 'event_callback') {
            ctx.body = '';
            ctx.status = 200;
    } else {
        ctx.status = 200;
    }
});
api.post('/slack/events/command', async (ctx : { body: any , status: number, request: any}) => {
    const body : any = ctx.request.body;
    if (body.token === verification) {
        web = new WebClient(oauthToken);    //user token 받아와서 사용
        let textBlock : any[];  //전송 메시지 담을 배열
        const textResult = await crawling();
        textBlock = [{type:"section", text:{type:"mrkdwn", text: "소프트웨어학부 취업 공지사항 입니다."}}];
        if(body.text === ''){
            //최근 페이지 공지 모두 전송
            textResult.map((item: any) => {
                const obj : any = {
                    type: "section", 
                    text: {
                        type:"mrkdwn",
                        text: "*"+ item.title + "*\n" + item.urlInfo
                    }
                };
                const divider : any = { type: "divider" };  //섹션 나누기용
                textBlock.push(obj);
                textBlock.push(divider);
            });
            web.chat.postMessage({
                channel: body.channel_id,
                blocks: textBlock
            });
        } else if(body.text === '오늘'){
            //오늘 게시물 전송
            const today : any = new Date();
            const year : number = today.getFullYear();
            const month : number = today.getMonth()+1;
            const date : number  = today.getDate();
            let todayStr : string = ''; 
            let cnt : number = 0;   //오늘 게시글 개수 확인 용
            if(month == 11 || month == 12) {
                todayStr = `${year}.${month}.${date}`; 
            } else {
                todayStr = `${year}.0${month}.${date}`;     //month 가 한자리수면 0 붙인다.
            }
            console.log(todayStr);
            textResult.map((item: any) => {
                if(item.date === todayStr){
                    const obj : any = {
                        type: "section", 
                        text: {
                            type:"mrkdwn",
                            text: "*"+ item.title + "*\n" + item.urlInfo
                        }
                    };
                    const divider : any = { type: "divider" };
                    textBlock.push(obj);
                    textBlock.push(divider);
                    cnt += 1;
                }
            });
            if(cnt == 0) {
                textBlock[0].text.text = "오늘 올라온 게시글이 없습니다.";  
            }
            web.chat.postMessage({
                channel: body.channel_id,
                blocks: textBlock
            });
        }
        ctx.body = textBlock[0].text.text;  //미리보기 메시지
        ctx.status = 200;
    }
});

module.exports = api;