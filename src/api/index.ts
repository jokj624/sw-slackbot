import { WebClient } from '@slack/web-api';
import Router from 'koa-router';
import CONFIG from '../../config/bot.json';
import { crawling  } from '../crawl/crawling';
import qs from 'qs';
const token : string = CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN;
const verification : string = CONFIG.VERIFICATION_TOKEN;   //개발용 token
const cliId : string = process.env.SLACK_CLIENT_ID || '';
const cliSe : string = process.env.SLACK_CLIENT_SECRET || '';  //환경 변수 bot client 정보
const axios = require("axios");
const api = new Router();
const web = new WebClient(token);
let oauthToken: any;

api.get('/auth', async (ctx : { body: any , status: number, request: any, query: any}) => {
    if(!ctx.query.code){
        return; //접근 거부
    }
    const response = await axios({
        method: 'post',
        url: 'https://slack.com/api/oauth.v2.access',
        data: qs.stringify({
          client_id: cliId,
          client_secret: cliSe,
          code: ctx.query.code
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
    })  //distribution 시 verification
    console.log(response);
    if (response.ok === "true") {
        oauthToken = response.access_token;   //설치하려는 채널의 access token 저장
        console.log(oauthToken);
    }   
    ctx.body = oauthToken;
    ctx.status = 200;
});

api.post('/slack/events', async(ctx : { body: any , status: number, request: any}) => {
    const body : any = ctx.request.body;
    if(body.type === 'url_verification'){
        //url 검증
        ctx.body = body.challenge;
    } else {
        ctx.status = 200;
    }
});
api.post('/slack/events/command', async (ctx : { body: any , status: number, request: any}) => {
    const body : any = ctx.request.body;
    if (body.token === verification) {
        const textResult = await crawling();
        let textBlock: any[] = [{type:"section", text:{type:"mrkdwn", text: "소프트웨어학부 취업 공지사항 입니다."}}];
        textResult.map((item: any) => {
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
        });
        web.chat.postMessage({
            channel: body.channel_id,
            blocks: textBlock
        });
        ctx.body = body.text;
        ctx.status = 200;
    }
});

module.exports = api;