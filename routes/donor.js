const router = require('express').Router()
const models = require('../models')
const partials = {
  head: 'partials/head',
  foot: 'partials/foot'
}

//donor search
//donor form 

router.get('/', (req, res) => {
    res.render('donor-form',{
      partials
    })
  })
  
  router.post('/', async (req, res) => {
    // got all fields?
    const { name, dob, bloodType } = req.body
    if (!name || !dob || !bloodType) {
      res.send('please complete all fields')
      return
    }
    // find donor from session
    const admin = await models.Admin.findByPk(req.session.admin.id)
    // create form for donor
    const donor = await models.Donor.create({
      name: name,
      dob: dob,
      bloodType: bloodType
    })
    // redirect back to dashboard
    res.redirect('/donor_select')
  })
  
  module.exports = router