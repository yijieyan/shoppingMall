
const [redis, path] = [require('redis'), require('path')];
const [config] = [require('../config.js')[env]];
const {timeout = 60 * 60 * 24 * 2, host, port} = config.redis;
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);

let redisClient;
function connectionServer(){
    redisClient = redis.createClient(port,host);
};

/**
 * 判断key是否存在redis中
 */

async function has(key){
    if(!key) return ;
    if(!redisClient)
        connectionServer();
    return await redisClient.existsAsync(key);
}
/**
 * 根据key从redis中获取信息
 */
async function get(key){

    if(!key) return;
    if(!redisClient)
        connectionServer();
    let str = await redisClient.getAsync(key);
    return JSON.parse(str)
}


/**
 * 根据key从redis中删除信息
 */

async function del(key){
    if(!key) return;
    if(!redisClient)
        connectionServer();
    return await redisClient.delAsync(key);
}

/**
 * 把key、value存进redis中
 */
async function set(key,seems,_timeout = timeout){
    if(!key || !seems) return;
    if(!redisClient)
        connectionServer();
    if(seems instanceof Object)
        seems = JSON.stringify(seems);
    let val = await redisClient.setAsync(key,seems);
    await redisClient.expireAsync(key,_timeout);//设置超时时间
    return val;
}
module.exports = {has,get,del,set};

