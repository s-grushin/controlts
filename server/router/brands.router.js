const express = require('express')
const router = express()
const { getAllBrands, getBrand, createBrand, updateBrand, deleteBrand } = require('../controllers/vehicleController')

router.get('/', getAllBrands)
router.get('/:id', getBrand)
router.post('/', createBrand)
router.put('/', updateBrand)
router.delete('/:id', deleteBrand)

module.exports = router