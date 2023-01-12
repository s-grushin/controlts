const express = require('express')
const router = express()
const { getLoginUsers } = require('../controllers/publicDataController')

router.get('/getLoginUsers', getLoginUsers)


module.exports = router