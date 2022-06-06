const router = require('express').Router()
const models = require('../models')
const partials = {
  head: 'partials/head',
  foot: 'partials/foot'
}

router.get('/', async function (req, res) {
    const admin = await models.Admin.findByPk(req.session.admin.id)
    const donations = await models.Donation.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 12,
        include: models.Donor

    })
    // console.log(donations)
    res.render('dashboard', {
        partials,
        locals: {
            donations: donations,
            admin: admin
        }
    })
})

router.get('/register', function (req, res, next) {
    res.render('admin-register', {
      partials
    })
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

module.exports = router





//need these buttons
//dashboard
//admin registers 