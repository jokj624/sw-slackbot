import { WebClient } from '@slack/web-api';
import Router from 'koa-router';
import CONFIG from '../../config/bot.json';

const token = CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN;

const api = new Router();
const web = new WebClient(token);

api.post('/slack/events', (ctx) => {
    const body = ctx.request.body;
    const event = body.event;

    if(body.type === 'event_callback'){
        //메세지 이벤트
        if(event.text === '가져와'){
            console.log(`수신 channel:${event.channel}, user: ${event.user}`);
            web.chat.postMessage({
                channel: event.channel,
                text: '가져올게요'
            }).then(result => {
                console.log('메세지 발신 : ' + result.ts);
            });
            ctx.status = 200;
        }
    } else if(body.type === 'url_verification'){
        //url 검증
        console.log('url verification');
        ctx.body = body.challenge;
    } else {
        ctx.status = 200;
    }
});

module.exports = api;