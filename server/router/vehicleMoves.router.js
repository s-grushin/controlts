const express = require('express')
const router = express()
const { getArrivalData, getAll, create, getWeightAndCameraData,
    getPhotos, getById, getCheckoutPassPrintData, getStartingServices } = require('../controllers/vehicleMovesController')

router.get('/', getAll)
router.get('/getArrivalData', getArrivalData)
router.get('/getWeightAndCameraData', getWeightAndCameraData)
router.get('/getCheckoutPassPrintData', getCheckoutPassPrintData)
router.get('/getStartingServices', getStartingServices)
router.get('/:id', getById)
router.get('/getPhotos', getPhotos)
router.post('/', create)

module.exports = router