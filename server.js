var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');

var index = require('./routes/index');
var team = require('./routes/team');
var unlock = require('./routes/unlock');
var stats = require('./routes/stats');
var character = require('./routes/character');
var battle = require('./routes/battle');

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'rpg', //env var: PGDATABASE
  password: 'cris0717', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT

};

var app = express();


var client = new pg.Client();




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

app.use('/', index);
app.use('/unlock', unlock);
app.use('/stats', stats);
app.use('/team', team);
app.use('/battle',battle);
app.use('/character',character);

// catch 404 and forward to error handler


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

unlock.get('/:user_id?',function(req,res){


});
stats.get('/:user_id?',function(req,res){


});

team.get('/:user_id?',function(req,res){


});

battle.get('/:user_id?',function(req,res){


});

character.get('/:user_id?',function(req,res){


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
