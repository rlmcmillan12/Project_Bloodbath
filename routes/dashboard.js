const router = require('express').Router()
const models = require('../models')

router.get('/', async function (req, res) {
    const admin = await models.Admin.findByPk(req.session.admin.id)
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
            donations: donations,
            admin: admin
        }
    })
})

module.exports = router





//need these buttons
//dashboard
//admin registers 