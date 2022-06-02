var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const res = require('express/lib/response');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/register', function(req, res, next) {
  res.render('admin-register')
});

router.post('/register', (req, res) => {
  // get information from req.body
  const { username, password } = req.body
  if (!username || !password) {
    res.send('Please include required fields')
    return
  }
  // check if all inputs are valid
  models.Admin.findOne({
    where: { username: username }
  })
  .then(admin => {
    // username/email already taken
    if (admin) {
      res.send('Username already taken')
      return
    }
    // hash password
    bcrypt.hash(password, 10)
      .then(hash => {
        // send information to database
        models.Admin.create({
          username,
          password: hash
        })
          .then(admin => {
            // send user to correct place w/ message
            res.redirect('/users/login')
          })
      })
  })
})

router.get('/login', function(req, res){
  res.render('admin-login')
})


router.post('/login', async (req, res) => {
  // get details from req.body
  const { username, password } = req.body
  if (!username || !password) {
    res.send('all fields required')
    return
  }
  // find user
  const admin = await models.Admin.findOne({
    where: { username: username }
  })
  // is there a user
  if (!admin) {
    res.send('username not found')
    return
  }

  // compare password to hash
  const passwordIsCorrect = await bcrypt.compare(password, admin.password)
  if (!passwordIsCorrect) {
    res.send('password not correct')
    return
  }

  req.session.admin = admin
  // redirect to home
  res.redirect('/dashboard')
})
router.get('/logout', function(req, res){
  req.session.admin = null
  res.redirect('/users/login')
})




module.exports = router;

