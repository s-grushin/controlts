const express = require('express')
const router = express()
const { getAll, getById, create, update, deleteOne, getDriverHistory } = require('../controllers/companiesController')

router.get('/getDriverHistory', getDriverHistory)
router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/', update)
router.delete('/', deleteOne)

module.exports = router