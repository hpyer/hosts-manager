var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
<<<<<<< HEAD
var i18n = require("i18n");

var routes = require('./routes/index');
=======

var routes = require('./routes/index');
var users = require('./routes/users');
>>>>>>> cc8e914b13ebf17da00aefddc212a2e2f28d7e28

var app = express();

app.config = require('./config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
// i18n settings
i18n.configure({
    locales: app.config.languages,
    defaultLocale: app.config.default_language,
    directory: __dirname + '/languages',
    queryParameter: 'lang'
});

// default: using 'accept-language' header to guess language settings
app.use(i18n.init);

app.use('/', routes);
=======
app.use('/', routes);
app.use('/users', users);
>>>>>>> cc8e914b13ebf17da00aefddc212a2e2f28d7e28

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
