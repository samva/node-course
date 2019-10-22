const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

const greetings = require('./module');

router
    .get('/', (ctx, next) => {
        console.log(ctx);
        ctx.body = 'Hello, world from koa-router';
    })
    .post('/users', async (ctx, next) => {
        ctx.body = greetings.greetings(ctx.request.body.name);
        console.log({ctx_body: ctx.body});
    });

app.use(async (ctx, next) => {
    console.log('f 1-1');
    await next();
    console.log('f 1-2');
});

app.use(async (ctx, next) => {
    console.log('f 2-1');
    await next();
    console.log('f 2-2');
});

app.use((ctx, next) => {
    console.log('f 3-1');
    next();
    console.log('f 3-2');
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('started...');
});

process.on('SIGINT', () => {
    console.log('Received SIGINT.');
    process.exit();
});
