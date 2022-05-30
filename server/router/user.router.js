const express = require('express')
const { getAll, getOne, create } = require('../controllers/userController')
const router = express()

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)

module.exports = router