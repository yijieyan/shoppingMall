const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let orderSchema = new Schema({
    orderDetail: [{
        goodId: String,
        num: Number,
        productName: String,
        price: String,
        _id: 0
    }],
    addressInfo: {
        name: String,
        address: String,
        phone: String,
        _id: 0
    },
    commitUser: String
}, {versionKey: false, timestamps: true});
module.exports = mongoose.model('order', orderSchema);