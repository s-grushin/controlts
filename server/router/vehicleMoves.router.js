const express = require('express')
const router = express()
const { getCheckoutData, create, test } = require('../controllers/vehicleMoveController')

router.get('/getCheckoutData', getCheckoutData)
router.post('/', create)
router.post('/test', test)

module.exports = router