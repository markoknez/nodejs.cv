var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var log = require('./helpers/logger')('app');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');

var routes = require('./routes/index');
var passport = require('./routes/passportHelper');

//session store
var session = require('express-session');
var sessionStore = require('connect-mongo')(session);
var sessionStoreConnection = require('mongoose').connection;


//--------------REST routers
var admin = require('./routes/rest/admin');
var users = require('./routes/rest/users');
var contacts = require('./routes/rest/contacts');
var educations = require('./routes/rest/educations');
var experiences = require('./routes/rest/experiences');
var languages = require('./routes/rest/languages');
var programmings = require('./routes/rest/programmings');


//open paths to public access
var publicPaths = [{
  from: 'public'
}, {
  from: 'bower_components'
}];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

_.each(publicPaths, function(item) {
  if (!item.to)
    app.use(express.static(path.join(__dirname, item.from)));
  else
    app.use(item.to, express.static(path.join(__dirname, item.from)));
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(session({
  secret: '0efa268a-ab82-4534-9c96-758f4dea6d88',
  store: new sessionStore({
    mongooseConnection: sessionStoreConnection
  }),
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next){
  if(req.user){
    //log.info('User detected:', {user: req.user});    
    res.cookie('username', req.user.email);
  }else{
    res.clearCookie('username');
  }
  next();
});

app.use('/', routes);
app.use('/admin', admin);
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
    return res.send(err.message);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
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