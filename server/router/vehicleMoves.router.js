const express = require('express')
const router = express()
const { getCheckoutData, getAll, create, getWeightAndCameraData, getPhotos, getById, test } = require('../controllers/vehicleMovesController')

router.get('/', getAll)
router.get('/getCheckoutData', getCheckoutData)
router.get('/getWeightAndCameraData', getWeightAndCameraData)
router.get('/:id', getById)
router.get('/getPhotos', getPhotos)
router.post('/', create)
router.post('/test', test)

module.exports = router