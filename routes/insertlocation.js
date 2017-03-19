var express = require('express');
var app = express();
var router = express.Router();



var cassandra = require('cassandra-driver')
var client = new cassandra.Client({contactPoints: ['127.0.0.1'] }); //connect cassandra

client.connect(function(err,result){
	console.log("connect insert location");

});

router.get('/', function(req, res) {
	
	res.render('register');
});


router.post('/',function(req,res){
	id= cassandra.types.varchar();
	var insertlocation = "INSERT INTO registration.location (l_id , l_name) VALUES (?,?);"; //database
	console.log(req.body.location);
	client.execute(insertlocation,[id ,req.body.location],
		function(err,result){

			if(err){
				res.status(404).send({msg: err});
			}else {
				
	console.log('success insert location');
				res.redirect('/');
			}
		});


});

module.exports = router;