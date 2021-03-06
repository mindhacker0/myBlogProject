var history = require('connect-history-api-fallback');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressJwt = require('express-jwt');
var publicRouter = require('./routes/public');
var userRouter = require('./routes/user');
var homeRouter = require('./routes/home');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myblog');
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
  path: ['/user/login','/getUserRoute']  // 指定路径不经过 Token 解析
}));
// app.use('/',history());//前端设置history模式不会报错
app.use('/', publicRouter);
app.use('/user', userRouter);
app.use('/home', homeRouter);
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
