var express = require('express');
var router = express.Router();
//var managetype = require('./managetype')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

module.exports = router;
