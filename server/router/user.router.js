const express = require('express')
const { getAll, getOne, create, login, update, deleteOne, changePassword } = require('../controllers/userController')
const router = express()

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.post('/login', login)
router.put('/', update)
router.delete('/', deleteOne)
router.put('/:id/password', changePassword)

module.exports = router