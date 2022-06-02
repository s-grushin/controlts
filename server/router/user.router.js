const express = require('express')
const { getAll, getOne, create, login, update } = require('../controllers/userController')
const router = express()

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.post('/login', login)
router.put('/', update)

module.exports = router