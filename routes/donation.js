const router = require('express').Router()
const models = require('../models')

router.get('/', function (req, res) {
  res.render('donation');
})

module.exports = router