const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);
const logger = require('morgan');
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const oauthRouter = require('./routes/oauth');
const categoryRouter = require('./routes/stretch/category/category');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

const app = express();
require('dotenv').config();
const models = require("./models/index.js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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

// app.get('/auth/logout', function (req, res) {
//   delete req.session.displayName;//세션 삭제
//   req.session.save(function () {//데이터 저장이 끝났을때 호출됨 안전하게 redirect하기 위함
//     res.redirect('/welcome');
//   });
// });

// 로그인 시 세션 처리 콜백 코드
passport.serializeUser(function(profile, done) {
  console.log('serializer', profile);
  done(null, profile.username);
});
// 화면 이동 시 세션 처리
passport.deserializeUser(function(username, done) {
  console.log('deserializer', username);
  // User.findById(id, function(err, user) {
  // 아래의 id 값을 key로 db에서 조회해오면 됨.
  done(null, username);
  // });
});

passport.use(new KakaoStrategy({
  clientID: process.env.KAKAO_REST_API,
  callbackURL: 'http://127.0.0.1:3000/oauth/kakao/callback'
},
  (accessToken, refreshToken, profile, done) => {
    // 사용자의 정보는 profile에 들어있다.
    models.User.findOrCreate({
      where: {
        provider: profile.provider,
        provider_id: profile.id
      },
      defaults: {
        Provider: profile.provider,
        ProviderId: profile.id,
        NickName: profile.id
      }
    }).then((user, create) => {
      if (create) { 
        return done(null, profile) 
      } else {
         return done(null, profile) 
      }
    })
  }));

// Synchronizing all models at once //
models.sequelize.sync().then( () => {
  console.log("LOG: PASS: All models were synchronized successfully.\n");
}).catch(error => {
  console.log("LOG: FAIL: Fail to synchronize all models.\n");
  console.log(error);
});
app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/oauth', oauthRouter);
app.use('/stretch/category', categoryRouter);

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
