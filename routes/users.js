var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const res = require('express/lib/response');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

//login
//logout
