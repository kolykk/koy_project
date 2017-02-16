var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var cassandra = require('cassandra-driver')
var app = express();
var date = require('node-datetime');
var util =require('util');

//code for project eieieiei
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'date_09_10_2016'}); //connect cassandra
var d = date.create(); // create auto keyspace
var fm = d.format('Y-m-d H:M:S');
var m = d.format('m').toString().substr(1,1);
var query = "CREATE KEYSPACE IF NOT EXISTS m"+m;
var table = "CREATE TABLE IF NOT EXISTS m"+m;
table += "_2017.temperature_sensor ( data int, year int, month int, date int, hour int, minute int, second int, PRIMARY KEY (year,month,date,hour,minute,second));"
query += "_2017 WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };";
client.execute( query , function(err, result) {
	if(err){
		console.log('ERROR FIND!!! IS '+err);
	}else {
		console.log("Create key space successfully");
	}
});
client.execute( table , function(err, result) {
	if(err){
		console.log('ERROR FIND!!! IS '+err);
	}else {
		console.log("Create table successfully");
	}
});


//insert to cassandra
app.post('/',function(req,res){
	var qs = require('querystring');
  	console.log("req.body.name"+ req.body['name']);

  	// console.log("req.body.name"+ req.body['']);


  	 // if(req.body.not_checked) {
    //   console.log('not checked : ' + req.body.);
    // }

    // if(req.body.checked) {
    //   console.log('checked : ' + req.body.checked);
    // }
                    // req.on('data', function(chunk) {
                      // console.log("data is "+util.inspect(req.data,{showHidden: false, depth: null}));
                        // if (req.method == 'POST') {
                        //     var body = '';
                        //     req.on('data', function (data) {
                        //         // console.log("data is "+data);
                        //         body += data;
                        //         // Too much POST data, kill the connection!
                        //         // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                        //         if (body.length > 1e6)
                        //             req.connection.destroy();
                        //     });
                        //     req.on('end', function () {
                        //         var post = qs.parse(body);
                        //         // use post['blah'], etc.
                        //         console.log("util.inspect(post) is "+util.inspect(post));
                        //         console.log("post.length is "+post.length);
                        //         console.log("post.data is "+post.data);
                        //         console.log("util.inspect(post.data) is "+util.inspect(post.data));

                        //     });
                        // }

                    // });
                });

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

app.use('/', index);
app.use('/users', users);

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


