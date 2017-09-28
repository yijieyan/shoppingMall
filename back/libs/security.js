const crypto = require('crypto');
let algorithm = "des3";
let securityKey = "你猜猜";
let intEncoding = "ascii";
let outEncoding = "hex";

/**
 * 加密
 *
 * @param buf
 * @returns {string}
 */
function cipher(buf) {
    let encrypted = "",
        cip = crypto.createCipher(algorithm, securityKey);
    encrypted += cip.update(buf, intEncoding, outEncoding);
    encrypted += cip.final(outEncoding);
    return encrypted;
};

/**
 * 解密
 *
 * @param encryptedBuf
 * @returns {string}
 */
function decipher(encryptedBuf) {
    let decrypted = "",
        decipher = crypto.createDecipher(algorithm, securityKey);
    decrypted += decipher.update(encryptedBuf, outEncoding, intEncoding);
    decrypted += decipher.final(intEncoding);
    return decrypted;
};


/**
 * 签名校验
 *
 * @param buf
 * @returns {*}
 */
function sign(buf) {
    let md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
        md5.update(buf);
    let hash = md5.digest('hex');
    return hash;
};

module.exports = {
    cipher, decipher, sign
};