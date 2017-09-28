const router = require('koa-router')();
let util = require('../libs/util');
let User = require('../models/user');
let commonError = require('../libs/error');
let security = require('../libs/security');
let Good = require('../models/goodList');
let Order = require('../models/order');
router.prefix('/order');

router.post('/commitOrder', async function(ctx, next) {
    let {addressInfo} = util.getParams(ctx.request.body);
     addressInfo = JSON.parse(addressInfo);
    let u = await User.findOne({_id: ctx.userId});
    let goods = u.myGoodList.filter(item => {
        return item.active == true && item.checked == true;
    });
    let o = await Order.create({
        commitUser: ctx.userId,
        orderDetail: goods,
        addressInfo
    });
    ctx.success({data: `commit successful`,_id: o._id});
});


router.get('/getOrder', async function (ctx, next) {
    let {id} = util.getParams(ctx.query);
    let order = await Order.findOne({_id: id});
    let sum = 0;
    order.orderDetail.forEach(item => {
        sum+= +item.price;
    });
    ctx.success({id: order._id, price: sum});
});
module.exports = router;