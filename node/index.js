var express = require('express');
var bodyParser=require('body-parser')
var app = express();

var home=require('./routers/home')
var userRouter = require('./routers/user');  //引入新建的路由文件
var mapData=require('./routers/mapData')
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyParser.urlencoded({ extended: false })); //bodyParser.urlencoded 用来解析request中body的 urlencoded字符，只支持utf-8的编码的字符，也支持自动的解析gzip和 zlib。返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。

// app.use(bodyParser.urlencoded({
//     extended:true 
// }))
app.use(bodyParser.json())

app.use('/',home)
app.use('/user', userRouter);   //配置该文件
app.use('/mapdata',mapData)

app.listen(3001);