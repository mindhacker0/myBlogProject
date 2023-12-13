const history = require('connect-history-api-fallback');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressJwt = require('express-jwt');
const publicRouter = require('./routes/public');
const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');
const fileDownload = require('./routes/filedownload');
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/myblog');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//外部可以与访问的静态域
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","*");
    if(req.method.toLowerCase() == 'options'){
      res.send(200);  //让options尝试请求快速结束
    }else{
        next();
    }
});
app.use(expressJwt({//ps:这一步主要是做jwt验证的,验证通过jsonwebtoken生成的token
  algorithms: ['HS256'],
  secret: 'secret12345',  // 签名的密钥 或 PublicKey
}).unless({
  path: ['/user/login','/getUserRoute','/favicon.ico',new RegExp('/filedownloads/.*')]  // 指定路径不经过 Token 解析
}));
// app.use('/',history());//前端设置history模式不会报错
app.use('/', publicRouter);
app.use('/user', userRouter);
app.use('/home', homeRouter);
app.use('/filedownloads',fileDownload)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
