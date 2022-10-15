const Parking = require('../models/Parking')

async function getAll(req, res, next) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0

    try {
        const data = await Parking.findAndCountAll({ limit, offset })
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }

}

async function getOne(req, res, next) {

    const { id } = req.params
    try {
        const data = await Parking.findOne({ where: { id } })
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }
}

async function create(req, res, next) {

    try {
        const data = await Parking.create(req.body)
        return res.json(data)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }

}

async function update(req, res, next) {

    const data = req.body
    try {
        const updated = await Parking.update(data, { where: { id: data.id } })
        return res.json(updated)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }
}

async function deleteOne(req, res, next) {

    const { id } = req.params

    try {
        const deleted = await Parking.destroy({ where: { id } })
        return res.json(deleted)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }
}


module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.deleteOne = deleteOne