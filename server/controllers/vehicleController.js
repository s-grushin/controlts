const VehicleBrand = require('../models/VehicleBrand')
const ApiError = require('../utils/ApiError')

async function getAll(req, res, next) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0

    try {
        const data = await VehicleBrand.findAndCountAll({
            limit,
            offset,
            order: [['name']],
            include: ['models'],
            distinct: true,
        })
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }

}

async function getOne(req, res, next) {

    const { id } = req.params
    try {
        const data = await VehicleBrand.findByPk(id, { include: ['models'] })
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }
}

async function create(req, res, next) {

    try {
        const data = await VehicleBrand.create(req.body)
        return res.json(data)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }

}

async function update(req, res, next) {

    const data = req.body
    try {
        const updated = await VehicleBrand.update(data, { where: { id: data.id } })
        return res.json(updated)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }
}

async function deleteOne(req, res, next) {

    const { id } = req.params

    try {
        const deleted = await VehicleBrand.destroy({ where: { id } })
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