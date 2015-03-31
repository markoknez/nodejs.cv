var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');

var routes = require('./routes/index');
var users = require('./routes/users');
var contacts = require('./routes/contacts');
var educations = require('./routes/educations');
var experiences = require('./routes/experiences');
var languages = require('./routes/languages');
var programmings = require('./routes/programmings');

app.io = require('socket.io')();

//socket io engine setup
app.io.on('connect', function(socket) {
  console.log('connect');
  socket.on('disconnect', function() {
    console.log('disconnect');
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//open paths to public access
//TODO: restric access to only JS and CSS files
var publicPaths = [{
  from: 'public',
  to: null
}, {
  from: 'bower_components',
  to: null
}];
_.each(publicPaths, function(item) {
  if (!item.to)
    app.use(express.static(path.join(__dirname, item.from)));
  else
    app.use(item.to, express.static(path.join(__dirname, item.from)));
});

app.use('/', routes);
app.use('/users', users);
app.use('/contacts', contacts);
app.use('/educations', educations);
app.use('/experiences', experiences);
app.use('/languages', languages);
app.use('/programmings', programmings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
//validation error handling
app.use(function(err, req, res, next) {
  if (err.name == 'ValidationError') {
    return res.status(400).send({
      message: 'Validation failed',
      errors: err.errors
    });
  }
  next(err);
});

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