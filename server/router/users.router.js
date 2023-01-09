const express = require('express')
const { getAllUsers, getUserById, getProfile, saveProfile, createUser, updateUser, deleteUser, changePassword } = require('../controllers/usersController')
const router = express()

router.get('/', getAllUsers)
router.get('/getProfile', getProfile)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/', updateUser)
router.put('/saveProfile', saveProfile)
router.delete('/', deleteUser)
router.put('/changePassword', changePassword)

module.exports = router