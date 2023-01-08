const express = require('express')
const { login, restoreAuth } = require('../controllers/authController')
const router = express()

router.post('/login', login)
router.post('/restoreAuth', restoreAuth)

module.exports = router