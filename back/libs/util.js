const xss = require('xss');
let getParams = function (obj) {
    let o = {};
    for(let key in obj) {
        o[key] = xss(obj[key]);
    }
    return o;
};

module.exports ={
    getParams
};