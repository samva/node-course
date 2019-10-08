const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router
    .get('/', (ctx, next) => {
        console.log(ctx);
        ctx.body = 'Hello, world from koa-router';
    })
    .post('/users', async (ctx, next) => {
        let arr = [];

        await new Promise( (resolve, reject) => {
            ctx.req.on('data', data => {
                arr.push(data);
            });
            ctx.req.on('end', () => {
                console.log(arr)
                console.log(JSON.parse(arr))
                ctx.body = JSON.parse(arr);
                resolve();
            });
        });
    });

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('started...');
});
