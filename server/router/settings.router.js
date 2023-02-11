const express = require('express')
const router = express()
const { getAll, getByName, update } = require('../controllers/settingsController')

router.get('/', getAll)
router.get('/:name', getByName)
router.put('/', update)

module.exports = router