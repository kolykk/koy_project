var express = require('express');
var router = express.Router();
//var managetype = require('./managetype')

/*//GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});


/*router.get('/register', function (req, res) {
  res.render('register');
})

*/

module.exports = router;
