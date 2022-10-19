const asyncHandler = require('express-async-handler')
const VehicleBrand = require('../models/VehicleBrand')


async function getAll(req, res) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0

    const data = await VehicleBrand.findAndCountAll({ limit, offset })
    return res.json(data)
}

async function getById(req, res) {

    const { id } = req.params
    const data = await VehicleBrand.findOne({ where: { id }, include: 'models' })
    if (data) {
        return res.status(200).json(data)
    } else {
        return res.status(400).json({ message: 'not found' })
    }

}

async function create(req, res) {

    const data = await VehicleBrand.create(req.body)
    return res.status(200).json({ message: 'created' })

}

async function update(req, res) {

    const data = req.body
    const updated = await VehicleBrand.update(data, { where: { id: data.id } })
    if (updated) {
        return res.status(200).json({ message: 'updated' })
    } else {
        return res.status(400).json({ message: 'id not found' })
    }

}

async function deleteOne(req, res) {

    const { id } = req.body
    const deleted = await VehicleBrand.destroy({ where: { id } })
    if (deleted) {
        return res.status(200).json({ message: 'deleted' })
    } else {
        return res.status(400).json({ message: 'id not found' })
    }

}


module.exports.getAll = asyncHandler(getAll)
module.exports.getById = asyncHandler(getById)
module.exports.create = asyncHandler(create)
module.exports.update = asyncHandler(update)
module.exports.deleteOne = asyncHandler(deleteOne)