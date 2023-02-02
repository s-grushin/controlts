const express = require('express')
const router = express()
const { getArrivalData, getAll, create, getWeightAndCameraData, getPhotos, getById, getCheckoutPassPrintData, test } = require('../controllers/vehicleMovesController')

router.get('/', getAll)
router.get('/getArrivalData', getArrivalData)
router.get('/getWeightAndCameraData', getWeightAndCameraData)
router.get('/getCheckoutPassPrintData', getCheckoutPassPrintData)
router.get('/:id', getById)
router.get('/getPhotos', getPhotos)
router.post('/', create)
router.post('/test', test)

module.exports = router