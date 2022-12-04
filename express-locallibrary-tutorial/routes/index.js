var express = require('express');
var router = express.Router();

/* GET home page. */
//route renders a response using templates 'index' passing the template variable 'title'
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
// GET home page.
router.get("/", function (req, res) {
  res.redirect("/catalog");
});

module.exports = router;
