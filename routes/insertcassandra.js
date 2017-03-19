var express = require('express');
var app = express();
var router = express.Router();



var cassandra = require('cassandra-driver')
var client = new cassandra.Client({contactPoints: ['127.0.0.1'] }); //connect cassandra

client.connect(function(err,result){
	console.log("connect insert sensor");

});

router.get('/', function(req, res) {
	res.render('register');
});


router.post('/',function(req,res){
	id= cassandra.types.uuid();
	var insertsensor = "INSERT INTO registration.sensor (s_id , s_descriptions , s_established , s_name,s_location) VALUES (?,?,?,?,?);"; //database
	client.execute(insertsensor,[id , req.body.s_description, req.body.s_established, req.body.s_name, req.body.location],
		function(err,result){

			if(err){
				res.status(404).send({msg: err});
			}else {

				var insertdetail = "INSERT INTO registration.detail (s_name, control_humid, control_temp, start_time ,finish_time) VALUES (?,?,?,?,?);";
				client.execute(insertdetail,[req.body.s_name,req.body.control_humid, req.body.control_temp ,req.body.start_time,req.body.finish_time])

				console.log('success insert sensor');
				res.redirect('/');
			}
		});


});

module.exports = router;