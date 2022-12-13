const express = require('express')
const router = express()
const { getCheckoutData, create, getWeightAndCameraData, getPhotos, test } = require('../controllers/vehicleMovesController')

router.get('/getCheckoutData', getCheckoutData)
router.get('/getWeightAndCameraData', getWeightAndCameraData)
router.get('/getPhotos', getPhotos)
router.post('/', create)
router.post('/test', test)

module.exports = router