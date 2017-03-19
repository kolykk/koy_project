var express = require('express');
var app = express();
var router = express.Router();



var cassandra = require('cassandra-driver')
var client = new cassandra.Client({contactPoints: ['127.0.0.1'] }); //connect cassandra
  
client.connect(function(err,result){
console.log("connect select cassandra");

});

var getAllsensor = 'SELECT * FROM registration.sensor';

router.get('/test',function (req,res){

client.execute(getAllsensor,[],function(err,result){
  if(err){
    res.status(404).send({msg: err});
  }else {
    res.render('test', {
      sensor: result.rows
    })

  }
});
});


  /* var qs = require('querystring');
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
                          });
      
router.get('/register', function(req, res) {
  
  res.render('register');
});
*/
module.exports = router;