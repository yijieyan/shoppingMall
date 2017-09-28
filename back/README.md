# koa2 后端项目框架

# nodejs koa2-mongodb framework

## Installation
```
$ npm install  或者  cnpm install
```
## Features

<ul>
	<li>有完善的日志记录</li>
	<li>封装好用户的登陆状态和session，只需要安装好redis就可以直接使用，注册，登陆，注销接口已经提供，可以根据具体的需求做相应的修改</li>
	<li>提供了上传、下载和验证码图片等公用接口</li>
	<li>开发完成可以通过webpack打包合并压缩代码然后上传服务器运行，提高服务器的效率</li>
</ul>

### 1. Install dependencies:

```
$ npm install 或者  cnpm install
```
### 2.Start the server:
```
$ npm run start
```
## Examples
##### To view the examples, clone the Express repo and install the dependencies:

```
$ git clone https://github.com/yijieyan/koa2-mongodb.git
$ cd koa2-mongodb
$ npm install
```





> 需要注意的地方
#### 1. 本程序对xss 的处理比较浅，如果有富文本编辑需要去修改xss 的处理，自行添加白名单，现在程序默认会转移所有标签，如果是标签属性和输入脚本需要去做适当的处理，可以去mdn参考x-xss-protiction

####    2. csrf 本程序没有处理，需要根据程序的需求自行处理，可以参考一下几种思路
#####   2.1 判断域名，允许跨域的前提下，填写允许跨域的域名列表，陌生的域名不给访问
#####   2.2 判断请求头的 Referer ,来判断请求油漆面从哪里跳转过来的，如果不是本域名或者允许的域名就拒绝
#####   2.3 chrome 浏览器可以设置 cookies 的Samesite 属性来阻止
####    2.4 提交请求的时候默认提交一个随机数或者验证码去后端服务器验证，csrf 攻击者只会提交cookie并不会知道有默认的随机数或验证码的存在

####  3. cookies
##### 3.1 禁止存明文到cookie,生成的token或者设置cookie的唯一标示最好设置的秘钥复杂，前后加上随机数，用签名可以防止彩虹表查询，用对称加密可以防止攻击者的破解难度
#### 4. 点击劫持
##### 4.1设置http请求头去禁止内嵌iframe或者允许特定域名内嵌,可以参考mdn  的x-Frame-Option
#####  5. 传输安全
###### 5.1 建议选用https ，如果不用htts 建议密码加一次hash传输

> 启动文件看package.json


## License
MIT
