import Koa from 'koa';
import Router from 'koa-router';
const bodyParser = require('koa-bodyparser');
const api = require('./api');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology:true})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((e: any) => {
    console.error(e);
});

const app: Koa = new Koa();
const router: Router = new Router();
const port: number = Number(process.env.PORT) || 5000;

app.use(bodyParser());

router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, ()=> {
    console.log(`Koa server is listening on port ${port}`);
});