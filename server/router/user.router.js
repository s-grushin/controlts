const express = require('express')
const { getAll, getOne, create, login } = require('../controllers/userController')
const router = express()

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.post('/login', login)

module.exports = router