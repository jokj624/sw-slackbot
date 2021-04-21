import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const api = require('./api');
const app = new Koa();
const router = new Router();
const port: number = 3000;

app.use(bodyParser());

router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, ()=> {
    console.log(`Koa server is listening on port ${port}`);
});