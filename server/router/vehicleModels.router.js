const express = require('express')
const router = express()
const { getAll, getById, create, update, deleteOne } = require('../controllers/vehicleModelsController')

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/', update)
router.delete('/', deleteOne)

module.exports = router