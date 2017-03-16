var express = require('express');
var router = express.Router();


var qs = require('querystring');
if (req.method == 'POST') {
			                      	var body = '';
			                      	req.on('data', function (data) {
			                                // console.log("data is "+data);
			                                body += data;
			                                if (body.length > 1e6)
			                                	req.connection.destroy();
			                            });
			                      	req.on('end', function () {
			                      		var s_id = uuid.v1();
			                      		var post = qs.parse(body);
			                      		console.log("util.inspect(post) is "+util.inspect(post));
			                      		var s_name = post.name;
			                      		console.log("name is "+ s_name);
			                      		var s_established = post.established;
			                      		console.log("established is "+ s_establish);
			                      		var s_descriptions = post.descriptions;
			                      		console.log("descriptions is "+s_descriptions);
///////////////////////////////////////////////INSERT DATA TO CASSANDRA///////////////////////////////////
var query = "INSERT INTO registration.sensor (s_id , s_descriptions , s_establish , s_name) VALUES (:s_id,:s_descriptions,:s_establish,:s_name);";
const params = { s_id: s_id , s_descriptions: s_descriptions , s_establish: s_establish , s_location: s_location , s_name: s_name};
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
			               
////////////////////////////////END Get data by POST method//////////////////////







module.exports = router;
