const livr = require('livr');
const DB = require('./../initializers/db');
const db = new DB();

livr.Validator.defaultAutoTrim(true);

const itemIdValidator = new livr.Validator({
    itemId: ['required', 'positive_integer']
});


const itemsController = {
    async getItems(ctx, next) {
        ctx.body = await db.getItems()
    },
    async getItem(ctx, next) {
         ctx.body = await db.getItem(Number(ctx.params.id));
    },
    async createItem(ctx, next) {
        if (ctx.headers.authorization !== 'admin') {
            ctx.body = 'not allowed';
            ctx.status = 401;
            
            return ;
        }
        await db.createItem(ctx.request.body);
        ctx.body = 'created item';
    },
    async deleteItem(ctx, next) {
        db.deleteItem(Number(ctx.params.itemId));
        ctx.status = 204;
        ctx.body = 'deleted';
    },
    async updateItem(ctx, next) {
        const validationResult = itemIdValidator.validate({
            itemId: ctx.params.itemId
        });

        if (!validationResult) {
            ctx.body = itemIdValidator.getErrors();
            ctx.status = 400;
            return ;
        }

        await db.updateItem(Number(ctx.params.itemId), ctx.request.body);
        ctx.status = 201;
        ctx.body = 'updated';
    },
};

module.exports = itemsController;
