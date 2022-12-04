var express = require('express');
var router = express.Router();

/* GET users listing. */
/* /users/URL */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*router.get('/cool', function(req, res, next){
  res.send('You\'re so cool');
});*/

/*
router.get('/cool',(req,res,next)=>{
  res.send('Your so cool');
});
*/
module.exports = router;
