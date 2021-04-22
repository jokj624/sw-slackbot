const Koa = require('koa');
const Router = require('koa-router');
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

const app = new Koa();
const router = new Router();
const port: any = process.env.PORT || 5000;

app.use(bodyParser());

router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, ()=> {
    console.log(`Koa server is listening on port ${port}`);
});