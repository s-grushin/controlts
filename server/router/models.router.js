const express = require('express')
const router = express()
const { getAllModels, getModel, createModel, updateModel, deleteModel } = require('../controllers/vehicleController')

router.get('/', getAllModels)
router.get('/:id', getModel)
router.post('/', createModel)
router.put('/', updateModel)
router.delete('/', deleteModel)

module.exports = router