var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const models = require("./models/index.js");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// HTTP 메소드에 대한 요청 처리를 할 수 있다.
app.use('/', function(req, res, next) {
  console.log('/ 주소로 들어오는 모든 HTTP 메소드 요청을 처리합니다.');
  next();
});
// app.get('/', function(req, res, next) {
//   console.log('/ 주소로 들어오는 GET 메서드 요청을 처리합니다.');
//   next();
// });
// app.post('/data', function(req, res, next) {
//   console.log('/ 주소로 들어오는 POST 메서드 요청을 처리합니다.');
//   next();
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
