# sw-slackbot


### ð¤ ìëªì¬ìëíêµ ìíí¸ì¨ì´íë¶ ííì´ì§ ë´ ì·¨ì ê³µì§ ê²ìê¸ì ê°ì ¸ì¤ë Slack App   

* ìí¬ ì¤íì´ì¤ì ì¶ê°ë ìë ë²í¼ì í´ë¦­íì¸ì.  
* ë³¸ App ì¶ê° í ì¬ì©íê³ ì íë ì±ëìì ì± ì¶ê° í´ì£¼ìë©´ ë©ëë¤.   
* Appê³¼ ê°ë³ DMì¼ë¡ë ì¬ì© ê°ë¥í©ëë¤.   
* ì¹ìì ê°ì ¸ì¤ë ìëê° ëë ¤ ê°ë slack botì´ time out ë©ìì§ë¥¼ ë³´ë´ë ê²°ê³¼ìë ìê´ìì¼ë ë¬´ìí´ë ê´ì°®ìµëë¤...

<a href="https://slack.com/oauth/v2/authorize?client_id=1988645441393.1976247942707&scope=channels:history,im:history,chat:write,commands&user_scope=chat:write"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

#### Slash Command   
1. /update   
  ![image](https://user-images.githubusercontent.com/20807197/115517024-b12f7f80-a2c1-11eb-8abe-506de8efb314.png)   
  * ì·¨ì ê³µì§ ê²ìí ë´ 1íì´ì§(ìµê·¼) ê²ìê¸ì ê°ì ¸ìµëë¤.    

2. /update ì¤ë   
  ![image](https://user-images.githubusercontent.com/20807197/115517147-cc9a8a80-a2c1-11eb-9b41-99c037b2c436.png)   
  * ì·¨ì ê³µì§ ê²ìí 1íì´ì§ìì ì¤ë ì¬ë¼ì¨ ê²ìê¸ë§ ê°ì ¸ìµëë¤.   

#### ì£¼ì ì¬ì© ì¸ì´, ë¼ì´ë¸ë¬ë¦¬ ë° íë ììí¬   
1. Node.js V14.16.1
2. Koa
3. Typescript
4. @slack/web-api
5. cherrio
6. axios  

#### Deploy   
* Heroku   

#### Dependencies   
```
"dependencies": {
    "@slack/web-api": "^6.2.0-rc.0",
    "axios": "^0.21.1",
    "cheerio": "^1.0.0-rc.6",
    "dotenv": "^8.2.0",
    "form-data": "^4.0.0",
    "koa": "^2.13.1",
    "koa-bodyparser": "^4.3.0",
    "koa-request": "^1.0.0",
    "koa-router": "^10.0.0",
    "mongoose": "^5.12.5",
    "qs": "^6.10.1"
  },
  "devDependencies": {
    "@types/koa": "^2.13.1",
    "@types/koa-bodyparser": "^4.3.0",
    "@types/koa-router": "^7.4.2",
    "nodemon": "^2.0.7",
    "ts-node": "^9.1.1",
    "typescript": "^4.2.4" 
  }
  ```
