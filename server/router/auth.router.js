const express = require('express')
const { login, restoreAuth } = require('../controllers/authController')
const checkAuth = require('../middleware/checkAuth')
const router = express()

router.post('/login', login)
router.post('/restoreAuth', checkAuth, restoreAuth)

module.exports = router