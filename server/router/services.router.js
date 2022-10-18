const express = require('express')
const router = express()
const { getAll, getOne, create, update, deleteOne } = require('../controllers/serviceController')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.put('/', update)
router.delete('/:id', deleteOne)

module.exports = router