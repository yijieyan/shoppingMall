global.env = process.env.environment || 'localhost';


module.exports = {
    'development': {
        port: 5000,
        dbUrl: 'mongodb://localhost:27017/shop',
        redis: {
            port: 6379,
            host: 'localhost'
        }
    },
    'test': {
        port: 5000,
        dbUrl: 'mongodb://localhost:27017/shop',
        redis: {
            port: 6379,
            host: 'localhost'
        }
    },
    'prouction': {
        port: 5000,
        dbUrl: 'mongodb://localhost:27017/shop',
        redis: {
            port: 6379,
            host: 'localhost'
        }
    },
    'localhost': {
        port: 5000,
        dbUrl: 'mongodb://localhost:27017/shop',
        redis: {
            port: 6379,
            host: 'localhost'
        }
    }
};