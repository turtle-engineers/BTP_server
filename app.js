const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const MySQLStore = require('express-mysql-session')(session);
const logger = require('morgan');
var cors = require('cors');


const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

var app = express();
require('dotenv').config();
const models = require("./models/index.js");


// 파일 업로드 허용
app.use(fileUpload({
  createParentPath: true
}));
app.use('/profile',express.static('upload'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(
  cors({
    origin: "http://localhost:3000", // server의 url이 아닌, 요청하는 client의 url
    credentials: true
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret code'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret code',
  store: new MySQLStore({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database,
  }),
  cookie: {
      httpOnly: true,
      secure: false,
  }
}));


const passport = require('./lib/passport')(app);

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user/user');
const oauthRouter = require('./routes/oauth')(passport);
const categoryRouter = require('./routes/stretch/category/category');
const contentsRouter = require('./routes/stretch/contents/contents');
const bookmarkRouter = require('./routes/bookmark/bookmark');
const myRoutineRouter = require('./routes/my-routine/my-routine');
const notificationRouter = require('./routes/notification/notification');

// Synchronizing all models at once //
models.sequelize.sync().then( () => {
  console.log("LOG: PASS: All models were synchronized successfully.\n");
}).catch(error => {
  console.log("LOG: FAIL: Fail to synchronize all models.\n");
  console.log(error);
});

app.use('/', indexRouter);
app.use('/oauth', oauthRouter);
app.use('/user', userRouter);
app.use('/stretch/category', categoryRouter);
app.use('/stretch/contents', contentsRouter);
app.use('/bookmark', bookmarkRouter);
app.use('/my-routine', myRoutineRouter);
app.use('/notification', notificationRouter);


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
