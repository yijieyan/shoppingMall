# shoppingMall
前端vue ,后端nodejs （koa2） 搭配mongodb 和 redis

## Installation
```
$ git clone https://github.com/yijieyan/shoppingMall.git
$ cd shoppingMall
```

### 启动前端代码
```
$ cd font 
$ npm install or cnpm install
$ npm run dev 
```
### 启动后端代码
```
$ cd ../back
$ npm install or cnpm install
$ node app.js
```

### 导入数据到数据库
```
$ cd ../
$ mongorestore -d shop ./db
```

## License
```
MIT
```
