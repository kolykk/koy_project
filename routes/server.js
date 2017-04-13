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

  router.get('/details/:s_id',function(req,res){
    console.log("req.s_id is "+req.s_id);
    var query = "select s_name , control_humid , control_temp , finish_time , start_time from registration.detail WHERE s_id = "+req.s_id+"ALLOW FILTERING;";
    // const params = {d_id : id , control_humid : humid , control_temp : temp , finish_time : req.body.finish_time , s_name : req.body.s_name , start_time : req.body.start_time};
    client.execute( query ,{ prepare: true } , function(error, result) {
        if(error){
          console.log("error is "+error);
        }else {
          // console.log("test");
          console.log("result.rows is "+result.rows[0].control_humid);
          res.jsonp(result.rows);
          }
      });
  });

  router.get('/getdata',function(req,res){
    var query = "select * from registration.sensor;";
    // const params = {d_id : id , control_humid : humid , control_temp : temp , finish_time : req.body.finish_time , s_name : req.body.s_name , start_time : req.body.start_time};
    client.execute( query ,{ prepare: true } , function(error, result) {
        if(error){
          console.log("error is "+err1);
        }else {
          // console.log("test");
          // console.log("result.rows is "+result.rows);
          res.jsonp(result.rows);
          }
      });
  });

  router.param('s_id', function (req,res,next,s_id) {
    // console.log("s_id is "+s_id);
    // console.log("req.body is "+req.body);
    var query = "select s_id from registration.sensor where s_id = "+s_id+";";
    // const params = {d_id : id , control_humid : humid , control_temp : temp , finish_time : req.body.finish_time , s_name : req.body.s_name , start_time : req.body.start_time};
    client.execute( query ,{ prepare: true } , function(error, result) {
        if(error){
          console.log("error is "+error);
        }else {
          // console.log("TEST1");
          // console.log("result.rows is "+result.rows);
          // res.jsonp(result.rows);
          // console.log("result is "+result.rows[0].s_id);
          req.s_id = result.rows[0].s_id;
          next();
          }
      });
  });

  router.delete('/delete/:s_id',function(req,res){
    console.log("req.s_id is "+req.s_id);
    var query = "DELETE FROM registration.sensor WHERE s_id = "+req.s_id+";";
      client.execute( query , { prepare: true } , function(error, result) {
            if(error){
              console.log("ERROR is "+error);
            }else {
              // console.log("test2");
              console.log('SUCCESS !!');
              res.jsonp(result.rows);
            }
        });
  });


  router.put('/update/:s_id',function(req,res){
    console.log("req.s_id is "+req.s_id);
    console.log("req.body is "+req.body.s_name);
    var query = "UPDATE registration.sensor SET s_descriptions = ? , s_established = ? , s_location = ? , s_name = ? WHERE s_id = "+req.s_id+";";
    const params = [ req.body.s_descriptions , req.body.s_established , req.body.s_location , req.body.s_name ];
      client.execute( query , params , { prepare: true } , function(error, result) {
            if(error){
              console.log("ERROR is "+error);
            }else {
              // console.log("test2");
              console.log('SUCCESS !!');
              // res.redirect('/manageinfo');
            }
        });
  });

module.exports = router;
