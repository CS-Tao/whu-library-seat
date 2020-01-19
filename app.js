var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginState = require('./routes/loginState');
var grabState = require('./routes/grabState');
var staticsData = require('./routes/staticsData');
var yearData = require('./routes/yearData');
var yearDataAll = require('./routes/yearDataAll');
var dayData = require('./routes/dayData');
var deviceData = require('./routes/deviceData');
var downloadsInfo = require('./routes/downloadsInfo');
var dayTrendData = require('./routes/dayTrendData');
var distribution = require('./routes/distribution');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/loginState', loginState);
app.use('/grabState', grabState);
app.use('/staticsdata', staticsData);
app.use('/yeardata', yearData);
app.use('/yeardataall', yearDataAll);
app.use('/dayData', dayData);
app.use('/deviceData', deviceData);
app.use('/downloadsInfo', downloadsInfo);
app.use('/dayTrendData', dayTrendData);
app.use('/distribution', distribution);

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
