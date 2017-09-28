const security = require('../libs/security');
const commonError = require('../libs/error');
const redisService = require('../libs/redis');
module.exports = async function(ctx, next){
    ctx.success = function (data) {
        ctx.body = {
            code: 0,
            data: data
        }
    };

    ctx.error = function(code, data) {
        ctx.body = {
            code: code,
            data: data
        }
    };

    ctx.getSession = async function(__token) {
        try {
            if (__token)
                cookie = __token;
            let [secret, userId] = security.decipher(cookie).split(":");
            let session = await redisService.get(`${userId}`);
            if (!session || session.secret !== secret) throw new commonError.tokenValidationFailure();
            delete session.secret;
            session;
            return session;
        } catch (error) {
            throw new commonError.tokenValidationFailure();
        }
    };

    ctx.reSetSession = async function(value) {
        let [secret, userId] = security.decipher(cookie).split(":");
        let session = await redisService.get(`${userId}`);
        if (session.secret !== secret) throw new commonError.tokenValidationFailure();
        Object.assign(session, value);
        return await redisService.set(`${userId}`, session);
    };

    ctx.setSession = async function(seems, token = cookie) {
        let [secret, userId] = security.decipher(token).split(":");
        seems.secret = secret;
        seems._doc.secret = secret;
        return  await redisService.set(`${userId}`, seems);

    };

    ctx.delSession = async function(token) {
        let [secret, userId] = security.decipher(token).split(":");
        return  await redisService.del(`${userId}`);
    };
    ctx.sign = function(userId) {
        let cookie = security.cipher(`${new Date().getTime()}:${userId}`);
        return cookie;
    };
     if(ctx.path == '/favicon.ico') {
        return ;
    }

    if(ctx.path.startsWith('/public') || ctx.path == '/good/productList') {
        console.log(ctx.path);
    }else {
        let token = ctx.req.headers.token;
        let user= await ctx.getSession(token);
        if(!token) {
            throw new commonError.tokenValidationFailure();
        }
        ctx.userId = user._id;
    }
    await next();
};
