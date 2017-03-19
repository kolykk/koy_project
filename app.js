var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var date = require('node-datetime');
var util =require('util');
var uuid = require('node-uuid');
var routes = require('./routes/server');
var qs = require('querystring');
var selectcassandra = require('./routes/selectcassandra');
var insertcassandra= require('./routes/insertcassandra');
//var insertlocation = require('./routes/insertlocation');
////////////////////////Using Express framework///////////////////////////
var app = express();

///////////////////END Using Express framework///////////////////////////


//////////////////////////End Route ///////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Start My Web
app.use('/',routes);
app.use('/login',routes);


app.get('/test',selectcassandra);
app.use('/register',insertcassandra);

/* app.use('/register',function(res,req,next){

	app.use('/register',insertlocation);
	next()
	app.use('/register',insertsensor);
	next()
	res.render('/');
	
	});

*/






// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
