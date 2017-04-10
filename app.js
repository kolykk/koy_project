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
var ejsLint=require('ejs-lint/index.js');
var qs = require('querystring');
var selectcassandra = require('./routes/selectcassandra');
var insertcassandra= require('./routes/insertcassandra');
var editcassandra= require('./routes/editcassandra');
var showdetail= require('./routes/showdetail');
// var getdata = require('./routes/getdata');
const line =  require('node-line-bot-api');
//var edit = require('./routes/edit');
var cors = require('cors');
var selecttransaction = require('./routes/selecttransaction');

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

app.use('/test',routes);
app.get('/manageinfo',selectcassandra);
app.use('/register',insertcassandra);
//app.use('/edit',edit);
app.get('/transactions',selecttransaction);
app.use('/manageinfo',routes);
app.get('/showdetail',showdetail);

/* app.use('/register',function(res,req,next){
	app.use('/register',insertlocation);
	next()
	app.use('/register',insertsensor);
	next()
	res.render('/');

	});
  */

////////////////////// sensor /////////////////

app.use(cors())

app.post('/api/temp', function (req, res) {
  console.log(req.query.temp)
  res.send('success : ' + req.query.temp)
})

//////////////// end sensor /////////////////



///////////////////////Line BOT API//////////////////////
/*
line.init({
  accessToken: 'CdDYlY9qqNN7g64umv6/8UFdJE2x44h+8n2IdV74kiEY8OIftb9SMwqjr9O4VzEFu7Xh/V/Fkh5fVpqiGuzntROv/PocnPGQXtrN5i0azudzHYxapZqVnTpfrQZF2IxwqkRvkZFGyQ3GWbBUs0H2BAdB04t89/1O/w1cDnyilFU=',
  // (Optional) for webhook signature validation
  channelSecret: 'd42dbcc257489b8600bd879c33ca3d44'
})
 console.log("Sending messages to Line API");
 line.client.pushMessage({

            to: 'Ubf06abaa5636d4204976ee3939dcab40',
            messages:[
                {
                    "type":"text",
                    "text":"Warning"
                }
            ]
          })

          */

/*
 app.get('/sensor',function(req, res, next) {
                       console.log("Getting GET request");
                       var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
                      //  console.log("full url is "+fullUrl);
                      //  console.log("data is "+req.originalUrl);
                       var data = req.originalUrl;
                      //  console.log("data.substr is "+data.substr(0,12));
                      //  console.log("data.indexOf is "+data.indexOf("?"));
                      //  console.log("data.substr(8,data.length) is "+data.substr(8,data.length));
                       var string = data.substr(8,data.length);
                          //  var num_tem = string.length+1;
                          //  string[num_tem] = '&';
                          string += '&';
                       var DataObject = new Array();
                       var k=0;
                       for (var i = 0 , len = string.length; i < len; i++) {
                          // console.log("string["+i+"] is "+string[i]);
                          if(string[i] == '='){

                              var j=i+1;
                              var data = '';
                              while (string[j] != '&') {

                                data += string[j];
                                j++;

                                if (j == string.length) {
                                  return;
                                }
                              }
                               	console.log("data is "+data);
                                DataObject[k]=data;
                                k++;
                          }
                       }


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
