let generateError =  function(name, code, message){
    var c = function(customMsg, customCode){
        let temp = Error.call(this);
        temp.name = this.name = name;
        this.code = customCode || code;
        this.message = customMsg || message;
        this.stack = temp.stack;
    };

    c.prototype = Object.create(Error.prototype, {
        constructor: {
            value: c,
            writable: true,
            configurable: true
        }
    });

    return c;
};

module.exports = {
    PermissionDelied: generateError('PermissionDelied', 100000, '权限不足'),
    tokenValidationFailure: generateError('tokenValidationFailure', 100001, 'token校验失败'),
    UserIsExist: generateError('UserIsExist', 100002, '用户已经存在'),
    UserIsNotExist: generateError('UserIsNotExist', 100003, '用户不存在'),
    PasswordError: generateError('PasswordError', 100004, '密码错误')
};
