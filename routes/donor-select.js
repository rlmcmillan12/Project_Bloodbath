const router = require('express').Router()
const { Op } = require('sequelize')
const models = require('../models')


router.get('/', async function(req, res){
    if(req.query.dob){
        const startDate = new Date(req.query.dob)
        const endDate = new Date(startDate.getTime() + 86400000)

        const donors = await models.Donor.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 1500,
            where:{dob:{
                [Op.between]:[
                    startDate,endDate
                ]
            }}
        })
        res.render('donor-select', {
            locals: {
                donors: donors,
                dob: req.query.dob
            }
        }) 
    }
    else{
        res.render('donor-select', {
            locals: {
                donors: [],
                dob: ''
            }
        }) 
    }
})

module.exports = router