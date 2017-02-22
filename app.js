var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var date = require('node-datetime');
var util =require('util');
var uuid = require('node-uuid');

////////////////////////Using Express framework///////////////////////////
	var app = express();
///////////////////END Using Express framework///////////////////////////


//////////////////////////////////Connect to Cassandra/////////////////////////////
	var cassandra = require('cassandra-driver')
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
///////////////////////////END Connect to Cassandra/////////////////////////////



///////////////////////////Route ///////////////////////////////
		var index = require('./routes/index');
		var users = require('./routes/users');
		app.use('/', index);
		app.use('/users', users);
//////////////////////////End Route ///////////////////////////////



///////////////////////////////////Get data by POST method/////////////////////////////////////////
			app.post('/',function(req,res){
								var qs = require('querystring');
			                      // console.log("data is "+util.inspect(req.data,{showHidden: false, depth: null}));
			                        if (req.method == 'POST') {
			                            var body = '';
			                            req.on('data', function (data) {
			                                // console.log("data is "+data);
			                                body += data;
			                                if (body.length > 1e6)
			                                    req.connection.destroy();
			                            });
			                            req.on('end', function () {
																			var id = uuid.v1();
			                                var post = qs.parse(body);
			                                console.log("util.inspect(post) is "+util.inspect(post));
																			var name = post.name;
																			console.log("name is "+name);
																			var established = post.established;
																			console.log("established is "+established);
																			var type = post.type;
																			console.log("type is "+type);
																			var location = post.location;
																			console.log("location is "+location);
																			var descriptions = post.descriptions;
																			console.log("descriptions is "+descriptions);
///////////////////////////////////////////////INSERT DATA TO CASSANDRA///////////////////////////////////
																						var query = "INSERT INTO Sensor (id , descriptions , established , location , name , type ) VALUES (:id,:descriptions,:established,:location,:name,:type);";
																						const params = { id: id , descriptions: descriptions , established: established , location: location , name: name , type: type };
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
////////////////////////////////END Get data by POST method////////////////////////////////////////

//////////select////////
app.get('/', function (req, res) {

var query = 'SELECT * FROM Sensor';
client.execute(query,function(err, result) {
  console.log('got user profile with info ' + result.rows[0].name);
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
