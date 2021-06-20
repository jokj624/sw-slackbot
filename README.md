# sw-slackbot


### 🤖 숙명여자대학교 소프트웨어학부 홈페이지 내 취업 공지 게시글을 가져오는 Slack App   

* 워크 스페이스에 추가는 아래 버튼을 클릭하세요.  
* 본 App 추가 후 사용하고자 하는 채널에서 앱 추가 해주시면 됩니다.   
* App과 개별 DM으로도 사용 가능합니다.   
* 웹에서 가져오는 속도가 느려 가끔 slack bot이 time out 메시지를 보내나 결과와는 상관없으니 무시해도 괜찮습니다...

<a href="https://slack.com/oauth/v2/authorize?client_id=1988645441393.1976247942707&scope=channels:history,im:history,chat:write,commands&user_scope=chat:write"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

#### Slash Command   
1. /update   
  ![image](https://user-images.githubusercontent.com/20807197/115517024-b12f7f80-a2c1-11eb-8abe-506de8efb314.png)   
  * 취업 공지 게시판 내 1페이지(최근) 게시글을 가져옵니다.    

2. /update 오늘   
  ![image](https://user-images.githubusercontent.com/20807197/115517147-cc9a8a80-a2c1-11eb-9b41-99c037b2c436.png)   
  * 취업 공지 게시판 1페이지에서 오늘 올라온 게시글만 가져옵니다.   

#### 주요 사용 언어, 라이브러리 및 프레임워크   
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
