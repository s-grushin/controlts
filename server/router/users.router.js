const express = require('express')
const { getAllUsers, getUserById, createUser, login, updateUser, deleteUser, changePassword } = require('../controllers/usersController')
const router = express()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/', updateUser)
router.delete('/', deleteUser)
router.post('/login', login)
router.put('/changePassword', changePassword)

module.exports = router