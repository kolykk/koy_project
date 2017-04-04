var express = require('express');
var app = express();
var router = express.Router();



var cassandra = require('cassandra-driver')
var client = new cassandra.Client({contactPoints: ['127.0.0.1'] }); //connect cassandra

client.connect(function(err,result){
	console.log("connect select cassandra");

});

var getAllsensor = 'SELECT * FROM registration.sensor';
var getAlldetail = 'SELECT * FROM registration.detail';




router.get('/manageinfo',function (req,res){

	client.execute(getAllsensor,[],function(err,result){
		if(err){
			res.status(404).send({msg: err});
		}else {

			client.execute(getAlldetail,[],function(err1,result1){
				if(err1){
					res.status(404).send({msg: err1});
				}else{
					res.render('manageinfo', {
						sensor: result.rows,
						detail: result1.rows,	

					})
					console.log("success select cassandra");

				}

			})

		}
	});
});



module.exports = router;
