const express = require('express')
const router = express()
const { getCheckoutData } = require('../controllers/vehicleMoveController')

router.get('/getCheckoutData', getCheckoutData)

module.exports = router