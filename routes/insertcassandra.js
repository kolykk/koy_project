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


router.post('/insert',function(req,res){
	console.log("router.post");
	//console.log(new Date()); // date now
	id = cassandra.types.uuid();

				var insertsensor = "INSERT INTO registration.sensor (s_id , s_descriptions , s_established , s_name,s_location) VALUES (?,?,?,?,?);"; //database
				client.execute(insertsensor,[id , req.body.s_description, req.body.s_established, req.body.s_name, req.body.location],
					function(err,result){
						if(err){
							res.status(404).send({msg: err});
						}else {
							console.log("test1");
							console.log("req.body.s_name is "+req.body.s_name);
							console.log("req.body.start_time is "+req.body.start_time);
							console.log("req.body.finish_time is "+req.body.finish_time);
							var humid = parseFloat(req.body.control_humid).toFixed(2);
							console.log("humid is "+humid);
							var temp = parseFloat(req.body.control_temp).toFixed(2);
							console.log("temp is "+temp);
							var insertdetail = "INSERT INTO registration.detail (d_id, control_humid, control_temp,finish_time,s_name,start_time ) VALUES (?,?,?,?,?);";
							client.execute(insertdetail,[id ,req.body.control_humid,req.body.control_temp,req.body.finish_time,req.body.s_name,req.body.start_time],
								function(err1,result1){
									if(err1){
										console.log("error is "+err1);
										// console.log(humid);
										// console.log(temp);
										// console.log(s_name);
										// console.log(start_time);
										// console.log(finish_time);

									}else {
										console.log("test2");
										// console.log(temp);
										// console.log(humid);
										console.log('success insert sensor');
										res.redirect('/manageinfo');
									}
								})
							
						}

					})
			});


module.exports = router;






