import { WebClient } from '@slack/web-api';
import Router from 'koa-router';
import CONFIG from '../../config/bot.json';
import { crawling  } from '../crawl/crawling';

const token : string = CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN;
const verification : string = CONFIG.VERIFICATION_TOKEN;

const api = new Router();
const web = new WebClient(token);

api.post('/slack/events', async(ctx : { body: any , status: number, request: any}) => {
    const body : any = ctx.request.body;
    if(body.type === 'url_verification'){
        //url 검증
        ctx.body = body.challenge;
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