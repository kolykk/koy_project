var express = require('express');
var router = express.Router();
//var managetype = require('./managetype')

/*//GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});



module.exports = router;

