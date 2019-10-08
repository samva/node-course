const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();;

router
    .get('/', (ctx, next) => {
        console.log(ctx);
        ctx.body = 'Hello, world from koa-router';
    })
    .post('/users', async (ctx, next) => {
        console.log({ctx})
        ctx.body = ctx.request.body;
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
