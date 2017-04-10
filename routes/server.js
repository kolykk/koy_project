var express = require('express');
var router = express.Router();


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

module.exports = router;

