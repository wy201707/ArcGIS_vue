var express = require('express');
var app = express();

var home=require('./routers/home')
var userRouter = require('./routers/user');  //引入新建的路由文件

app.use('/',home)
app.use('/user', userRouter);   //配置该文件

app.listen(3001);