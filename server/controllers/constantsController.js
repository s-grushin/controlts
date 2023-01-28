const asyncHandler = require('express-async-handler')
const Constant = require('../models/Constant')

async function getAll(req, res) {

    const data = await Constant.findAll()
    return res.json(data)

}

async function getByName(req, res) {

    const { name } = req.params
    const data = await Constant.findOne({ where: { name } })
    if (data) {
        return res.status(200).json(data)
    } else {
        return res.status(400).json({ message: 'not found' })
    }

}

async function update(req, res) {

    const data = req.body

    const bulkUpdate = Object.keys(data).map(key => {
        return Constant.update({ value: data[key] }, { where: { name: key } })
    })

    const updated = await Promise.all(bulkUpdate)

    if (updated) {
        return res.status(200).json({ message: 'updated' })
    } else {
        return res.status(400).json({ message: 'update error' })
    }
}

module.exports.getAll = asyncHandler(getAll)
module.exports.getByName = asyncHandler(getByName)
module.exports.update = asyncHandler(update)