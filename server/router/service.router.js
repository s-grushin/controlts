const express = require('express')
const router = express()
const { getAll, getOne, create, update } = require('../controllers/serviceController')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.put('/', update)

module.exports = router