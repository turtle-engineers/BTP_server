const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/stretch/category/category');
const contentsRouter = require('./routes/stretch/contents/contents');
const bookmarkRouter = require('./routes/bookmark/bookmark');

const app = express();

const models = require("./models/index.js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Synchronizing all models at once //
models.sequelize.sync().then( () => {
  console.log("LOG: PASS: All models were synchronized successfully.\n");
}).catch(error => {
  console.log("LOG: FAIL: Fail to synchronize all models.\n");
  console.log(error);
});

// ***** ALL ROUTERS ***** //
app.use('/', indexRouter);
app.use('/stretch/category', categoryRouter);
app.use('/stretch/contents', contentsRouter);
app.use('/bookmark', bookmarkRouter);

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
