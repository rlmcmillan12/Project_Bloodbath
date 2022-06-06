const router = require('express').Router({ mergeParams: true})
const models = require('../models')

const partials = {
  head: 'partials/head',
  foot: 'partials/foot'
}

router.get('/', async function (req, res) {
  const donorId = req.params.id
  if (!donorId) {
    res.send('please complete all fields')
    return
  }
  const donor = await models.Donor.findByPk(donorId)
  console.log(donor)
  res.render('donation', {
    partials,
    locals: {
      donor
    }
  });
})
router.post('/', async (req, res) => {
  const donorId = req.params.id
  if (!donorId) {
    res.send('please complete all fields')
    return
  }
  const donor = await models.Donor.findByPk(donorId)
  console.log(donor)

  const donation = await models.Donation.create({
    DonorId: donorId
  })
  res.redirect('/donor_select')
})
module.exports = router