const livr = require('livr');
const db = require('./../db');

livr.Validator.defaultAutoTrim(true);

const itemIdValidator = new livr.Validator({
    itemId: ['required', 'positive_integer']
});


const itemsController = {
    getItems(ctx, next) {
        ctx.body = db.getItems();
    },
    getItem(ctx, next) {
         ctx.body = db.getItem(Number(ctx.params.id));
    },
    createItem(ctx, next) {
        if (ctx.headers.authorization !== 'admin') {
            ctx.body = 'not allowed';
            ctx.status = 401;
            
            return ;
        }
        db.writeItem(ctx.request.body);
        ctx.body = 'created item';
    },
    deleteItem(ctx, next) {
        db.deleteItem(Number(ctx.params.itemId));
        ctx.status = 204;
        ctx.body = 'deleted';
    },
    updateItem(ctx, next) {
        const validationResult = itemIdValidator.validate({
            itemId: ctx.params.itemId
        });

        if (!validationResult) {
            ctx.body = itemIdValidator.getErrors();
            ctx.status = 400;
            return ;
        }

        db.updateItem(Number(ctx.params.itemId), ctx.request.body);
        ctx.status = 201;
        ctx.body = 'updated';
    },
};

module.exports = itemsController;
