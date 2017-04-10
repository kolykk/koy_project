var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'] }); //connect cassandra


//var managetype = require('./managetype')

/*//GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


router.get('/login', function(req, res) {
  res.render('login');
});


router.get('/test',function(req,res){
	res.render('test');
});

router.get('/api',function(req,res){
	res.render('api');
});

router.get('/getdata',function(req,res){
  var query = "select * from registration.sensor;";
  // const params = {d_id : id , control_humid : humid , control_temp : temp , finish_time : req.body.finish_time , s_name : req.body.s_name , start_time : req.body.start_time};
  client.execute( query ,{ prepare: true } , function(error, result) {
      if(error){
        console.log("error is "+err1);
      }else {
        console.log("test");
        console.log("result.rows is "+result.rows);
        res.jsonp(result.rows);
        }
    });
});

router.get('/update',function(req,res){
  console.log("req.");
});
module.exports = router;
