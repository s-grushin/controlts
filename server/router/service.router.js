const express = require('express')
const router = express()
const { getAll } = require('../controllers/serviceController')

router.get('/', getAll)

module.exports = router