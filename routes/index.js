var express = require('express');
var router = express.Router();

//need to figure out how to declare the partials variable and export
const partials = {
  head: 'partials/head',
  foot: 'partials/foot'
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',{
    partials,
    locals: {
      title: 'index'
    }
  });
});



module.exports = router;
