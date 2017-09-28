const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    password: String,  //密码
    username: String,  // 用户名
    phone: String,      //手机号
    email: String, //邮箱
    avatar: String,   //头像
    myGoodList:[{
        productName: String,
        price: Number,
        pic: String,
        goodId: String,
        num: {
            type: Number,
            default: 0
        },
        checked:{
            type: Boolean,
            default:false
        },
        active: {
           type: Boolean,
           default: true
        },
        _id: 0
    }],
    myAddressList:[{
        address: String,
        phone: String,
        name: String,
        _id: 0,
        isDefault: {
            type:Boolean,
            default:false
        }
    }]
}, {versionKey: false, timestamps: true});
module.exports = mongoose.model('user', userSchema);