const router = require('koa-router')();
let util = require('../libs/util');
let User = require('../models/user');
let commonError = require('../libs/error');
let security = require('../libs/security');
let Good = require('../models/goodList');
router.prefix('/users');

router.post('/signOut', async function(ctx, next) {
    await ctx.delSession(ctx.headers.token);
    ctx.success({
        data: 'logout successful!'
    })
});

router.post('/addGood', async function(ctx, next) {
    let {id, num} = util.getParams(ctx.request.body);

    let goodInfo = await Good.findOne({_id: id});

    let u = await User.findOne({_id: ctx.userId});
    let index = u.myGoodList.findIndex(item => {
        return item.goodId == id && item.active == true;
    });

    if(index == -1 ) {
        u.myGoodList.push({
            productName: goodInfo.productName,
            price: goodInfo.price,
            pic: goodInfo.pic,
            goodId: goodInfo._id,
            num: 1,
        });
    }else {
        u.myGoodList.forEach(item => {
            if(item.goodId == id) {
                item.num++;
            }
        });

    }
    await u.save();

    ctx.success({data: 'add Good is successful!'})
});


router.get('/getMyGoodList', async function(ctx, next) {
    let u = await User.findOne({_id: ctx.userId});
    if(u) {
        let goods = u.myGoodList.filter(item => {
           return item.active == true;
        });
        ctx.success(goods);
    }else {
        ctx.success();
    }
});

router.post('/updateGoodCount', async function(ctx, next) {
    let {id, num, checked} = util.getParams(ctx.request.body);
    let u = await User.findOne({_id: ctx.userId});
    for(let i= 0; i< u.myGoodList.length; i++) {
        let item = u.myGoodList[i];
        if(item.goodId == id) {
            item.num = num;
            item.checked = checked;
        }
    }

    await u.save();
    ctx.success({data: `update successful!`})
});

router.post('/deleteGood', async function(ctx, next) {
    let {id} = util.getParams(ctx.request.body);
    await User.update({_id: ctx.userId}, {$pull: {myGoodList: {
        goodId: id
    }}});

    ctx.success({data: `delete good successful!`});
});

router.post('/selectAllGood', async function (ctx, next) {
    let {flag} = util.getParams(ctx.request.body);
    let u = await User.findOne({_id: ctx.userId});
    u.myGoodList.forEach(item => {
        item.checked = flag;
    });
    await u.save();
    ctx.success({data: 'update successful!'});
});

router.post('/getAddress', async function(ctx, next) {
   let u = await User.findOne({_id: ctx.userId});
   ctx.success({myAddressList: u.myAddressList});
});

router.post('/setDefault', async function(ctx, next) {
    let {name} = util.getParams(ctx.request.body);
    let u = await User.findOne({_id: ctx.userId});
    u.myAddressList.forEach(item => {
        item.isDefault = false;
        if(item.name == name) {
            item.isDefault = true;
        }
    });
    await u.save();
    ctx.success({data: `setDefault address successful!`});
});

router.post('/confirmAddress', async function(ctx, next) {
    let {name, address, phone} = util.getParams(ctx.request.body);
    let u = await User.findOne({_id: ctx.userId});
    let index =  u.myAddressList.findIndex(item => {
        return item.name == name;
    });
    if(index== -1) {
        u.myAddressList.push({
            name,
            address,
            phone
        });

    }else {
        u.myAddressList.forEach(i => {
            if(i.name == name) {
                i.phone = phone;
                i.address = address;
            }
        })
    }
        await u.save();
    ctx.success({data: `address successful`});
});

router.post('/deleteAddress', async function(ctx, next) {
    let {name} = util.getParams(ctx.request.body);
    await User.update({_id: ctx.userId}, {$pull:
        {
            myAddressList: {
                name: name
            }
        }
    });
    ctx.success({data: `delete address successful!`});
});

router.get('/getOrder', async function (ctx, next) {

    let u = await User.findOne({_id: ctx.userId});
    let arr = u.myGoodList.filter(item => {
        return item.active == true && item.checked == true;
    });

    ctx.success(arr);
});

router.post('/comfirmOrder', async function (ctx, next) {
    let u = await User.findOne({_id: ctx.userId});
    u.myGoodList.forEach(item => {
      if(item.checked) {
          item.active = false;
      }
    });
    await u.save();
    ctx.success({data: `confirm successful`});
});


router.get('/getCartCount', async function(ctx, next) {
    let u = await User.findOne({_id: ctx.userId});
    let count = 0;
    u.myGoodList.forEach(item => {
        if(item.active == true) {
            count= count+ item.num;
        }
    });
    ctx.success({count});
});
module.exports = router;
