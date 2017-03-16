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
//var sqlcassandra = require('./routes/sqlcassandra');
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
//app.use('/register',routes);
app.use('/login',routes);


var cassandra = require('cassandra-driver')
app.post('/', function(req, res) {
  var qs = require('querystring');
if (req.method == 'POST') {
                              var body = '';
                              req.on('data', function (data) {
                                      // console.log("data is "+data);
                                      body += data;
                                      if (body.length > 1e6)
                                        req.connection.destroy();
                                  });
                              req.on('end', function () {
                                var s_id = uuid.v1();
                                var post = qs.parse(body);
                                console.log("util.inspect(post) is "+util.inspect(post));
                                var s_name = post.name;
                                console.log("name is "+ s_name);
                                var s_established = post.established;
                                console.log("established is "+ s_establish);
                                var s_descriptions = post.descriptions;
                                console.log("descriptions is "+s_descriptions);
///////////////////////////////////////////////INSERT DATA TO CASSANDRA///////////////////////////////////
var query = "INSERT INTO registration.sensor (s_id , s_descriptions , s_establish , s_name) VALUES (:s_id,:s_descriptions,:s_establish,:s_name);";
const params = { s_id: s_id , s_descriptions: s_descriptions , s_establish: s_establish , s_location: s_location , s_name: s_name};
client.execute( query , params , { prepare: true } , function(err, result) {
  if(err){
    console.log('ERROR FIND!!! IS '+err);
  }else {
    console.log("Successfully !!");
  }
});
///////////////////////////////////////////////INSERT DATA TO CASSANDRA///////////////////////////////////
});
                            }
      
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
});

module.exports = app;
