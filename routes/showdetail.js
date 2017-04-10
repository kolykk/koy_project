var express = require('express');
var app = express();
var router = express.Router();



var cassandra = require('cassandra-driver')
var client = new cassandra.Client({contactPoints: ['127.0.0.1'] }); //connect cassandra

client.connect(function(err,result){
	console.log("connect edit sensor info cassandra");

});

var getDetailById = 'SELECT * FROM registration.sensor where s_id = ?';




router.get('showdetail/:id',function (req,res){
client.execute(getDetailById,[req.params.id],function(err,result){

		if(err){
			res.status(404).send({msg: err});
		}else{
					res.render('showdetail', {
					name : result.rows[0].s_name,
					control_humid : result.rows[0].control_humid,
					control_temp : result.rows[0].control_temp,
					start_time : result.rows[0].start_time,
					finish_time : result.rows[0].finish_time


})
}
})
});



module.exports = router;
