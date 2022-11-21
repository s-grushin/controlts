const express = require('express')
const router = express()
const { getCheckoutData, create, getDrivers, test } = require('../controllers/vehicleMoveController')

router.get('/getCheckoutData', getCheckoutData)
router.post('/', create)
router.get('/getDrivers', getDrivers)
router.post('/test', test)

module.exports = router