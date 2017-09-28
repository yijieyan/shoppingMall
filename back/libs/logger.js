const path = require('path');
const fs = require('fs');
const bunyan = require('bunyan');
const pack = require('../package.json');

const loggerPath = path.resolve(__dirname, '../logs');
if (!fs.existsSync(loggerPath)) {
    fs.mkdirSync(loggerPath);
}

let logger = function() {
    global.logger = bunyan.createLogger({
        name: `${pack.name}`,
        streams: [
            {
                type: 'rotating-file',
                path: path.resolve(loggerPath, 'info.log'),
                period: '1d',
                count: 10
            },
            {
                level: 'error',
                path: path.resolve(loggerPath, 'error.log')
            }
        ]
    });
};




module.exports = {
    logger
};