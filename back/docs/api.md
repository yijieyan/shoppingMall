[1.注册](#id1)
[2.登陆](#id2)
###<span id="id1">1.注册</span>
####客户端
参数|value|类型|
|----|----|---|
|password|密码|String|
|phone|电话|String|
|username|用户名|String|
|email|邮箱|String|
```
url:'http://localhost:5000/public/signUp',
method: 'post'
```
```
curl -X POST \
  http://localhost:5000/public/signUp \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: be8efa38-e01f-b353-4036-ef2df93223ae' \
  -d 'password=123456&phone=15021578502&username=yijie.yan&email='
```

####服务器
```
{
    "code": 200,
    "data": "",
    "message": "操作成功"
}
```
###<span id="id2">2.登陆</span>
####客户端
参数|value|类型|
|----|----|---|
|password|密码|String|
|phone|电话|String|
|username|用户名|String|
|email|邮箱|String|
```
url: 'http://localhost:5000/public/signIn',
method: 'post'
```
```
curl -X POST \
  http://localhost:5000/public/signIn \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: ddac2e08-955d-22ad-b3af-80f2874f3556' \
  -d 'phone=150215785021&password=123456'
```
####服务器
```
{
    "code": 200,
    "data": "{\"token\":\"5cff4c3cdba17523e2f11763814eacf16d1bb3eaf7eabef6a64690f209f4f71d9af369a94d707080\"}",
    "message": "操作成功"
}
```