const asyncHandler = require('express-async-handler')
const Camera = require('../models/Camera')
const MoveRegistrationPhotoSettings = require('../models/MoveRegistrationPhotoSettings')
const VehicleType = require('../models/VehicleType')

async function getAll(req, res) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0

    const data = await MoveRegistrationPhotoSettings.findAndCountAll({
        limit, offset, include: [
            { model: Camera, as: 'camera', attributes: ['name'] },
            { model: VehicleType, as: 'vehicleType', attributes: ['name'] },
        ]
    })
    return res.json(data)
}

async function getById(req, res) {

    const { id } = req.params
    const data = await MoveRegistrationPhotoSettings.findOne({ where: { id } })
    return res.status(200).json(data)
}

async function create(req, res) {

    await MoveRegistrationPhotoSettings.create(req.body)
    return res.status(200).json({ message: 'created' })
}

async function update(req, res) {

    const data = req.body
    await MoveRegistrationPhotoSettings.update(data, { where: { id: data.id } })
    return res.status(200).json({ message: 'ok' })
}

async function deleteOne(req, res) {

    const { id } = req.body
    await MoveRegistrationPhotoSettings.destroy({ where: { id } })
    return res.status(200).json({ message: 'ok' })
}



module.exports.getAll = asyncHandler(getAll)
module.exports.getById = asyncHandler(getById)
module.exports.create = asyncHandler(create)
module.exports.update = asyncHandler(update)
module.exports.deleteOne = asyncHandler(deleteOne)