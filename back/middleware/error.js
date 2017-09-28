require('../libs/logger').logger();
module.exports = async function (ctx, next) {
    try {
        logger.info({
            method: ctx.req.method,
            url: ctx.req.url,
            headers: ctx.req.headers
        });
        await next();
    } catch (err) {
        ctx.status = err.status || 200;
        ctx.res.statusMessage = err.name || 'server error';
        console.log(err.stack);
        logger.error({
            code: err.code,
            message:err.name,
            stack: err.stack
        });
        ctx.error(err.code,err.name);
    }
};