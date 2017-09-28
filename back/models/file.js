const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let fileSchema = new Schema({
    savePath: String,  //文件保存路径
    fileName: String,  //文件名称
    mimeType: String,  // 文件类型
    size: String,      //文件大小
    originalname: String, //文件上传前的名字
    account: String,   //上传者
}, {versionKey: false, timestamps: true});
module.exports = mongoose.model('file', fileSchema);