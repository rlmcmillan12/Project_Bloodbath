const router = require('express').Router()
const models = require('../models')

router.get('/', async function(req, res){
    const donations = await models.Donation.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 6,
        include: models.Donor

    })
    console.log(donations)
    res.render('dashboard', {
        locals: {
            donations: donations
        }
    }) 
})

module.exports = router





//need these buttons
//dashboard
//admin registers 