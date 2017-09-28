const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let goodsListSchema = new Schema({
    productName: String,  //商品名称
    price: Number,  // 商品价格
    pic: String,      //商品的图片
}, {versionKey: false, timestamps: true});
module.exports = mongoose.model('good', goodsListSchema);