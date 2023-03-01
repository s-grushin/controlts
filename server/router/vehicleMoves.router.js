const express = require('express')
const router = express()
const { getArrivalData, getAll, create, getPhotos, getWeight,
    getById, getCheckoutPassPrintData, saveServices,
    getStartingServices, savePayData, saveOutgo } = require('../controllers/vehicleMovesController')

router.get('/', getAll)
router.get('/getArrivalData', getArrivalData)
router.get('/getPhotos', getPhotos)
router.get('/getWeight', getWeight)
router.get('/getCheckoutPassPrintData', getCheckoutPassPrintData)
router.get('/getStartingServices', getStartingServices)
router.get('/:id', getById)
router.post('/saveServices', saveServices)
router.post('/savePayData', savePayData)
router.post('/', create)
router.post('/saveOutgo', saveOutgo)

module.exports = router