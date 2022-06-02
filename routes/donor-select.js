const router = require('express').Router()
const models = require('../models')


router.get('/', async function(req, res){
    const donations = await models.Donation.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 1500,
        include: models.Donor

    })
    console.log(donations)
    res.render('donor-select', {
        locals: {
            donations: donations
        }
    }) 
})

module.exports = router