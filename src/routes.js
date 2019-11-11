const itemsController = require('./controllers/items');

function initRoutes(router) {

    router.get('/', (ctx, next) => {
        console.log(ctx);
        ctx.body = 'Hello, world from koa-router with src/routes.js !';
    });
    
    router.get('/items', itemsController.getItems);
    router.get('/items/:id', itemsController.getItem);
    router.post('/items', itemsController.createItem);
    router.delete('/items/:itemId', itemsController.deleteItem);
    router.put('/items/:itemId', itemsController.updateItem);
}

module.exports = initRoutes;
