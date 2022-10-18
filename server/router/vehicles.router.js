const express = require('express')
const router = express()
const { getAll, getBrand, createBrand, updateBrand, deleteBrand } = require('../controllers/vehicleController')

router.get('/', getAll)

module.exports = router