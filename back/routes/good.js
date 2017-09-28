const router = require('koa-router')();
let util = require('../libs/util');
let Good = require('../models/goodList');
let commonError = require('../libs/error');
let security = require('../libs/security');
router.prefix('/good');


router.get('/productList', async function(ctx, next) {
    let {sortBy, gte, lt, page} = util.getParams(ctx.query);
    if(gte && lt) {
        if(sortBy == 'price') {
            result = await Good.find({price: {$gte: +gte, $lt: +lt}}).sort({price: -1});
        }else if(sortBy == 'createdAt'){
            result = await Good.find({price: {$gte: +gte, $lt: +lt}}).sort({createdAt: -1});
        }
    }else {
        if(sortBy == 'price') {
            result = await Good.find({}).sort({price : -1});
        }else if(sortBy == 'createdAt'){
            result = await Good.find({}).sort({createdAt : -1});
        }

    }

    ctx.success(result);
});

module.exports = router;