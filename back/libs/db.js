const mongoose = require('mongoose');
const config = require('../config')[env];

mongoose.Promise = global.Promise;
let connection = mongoose.connect(config.dbUrl, {config: {autoIndex: false}, useMongoClient: true});

module.exports = connection;