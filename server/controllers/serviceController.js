const Service = require('../models/Service')

async function getAll(req, res, next) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0

    try {
        const services = await Service.findAndCountAll({ limit, offset })
        return res.json(services)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }

}

async function getOne(req, res, next) {

    const { id } = req.params
    try {
        const service = await Service.findOne({ where: { id } })
        return res.json(service)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }
}

async function create(req, res, next) {

    try {
        const service = await Service.create(req.body)
        return res.json(service)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }

}

async function update(req, res, next) {

    const service = req.body
    try {
        const updated = await Service.update(service, { where: { id: service.id } })
        return res.json(updated)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }
}

async function deleteOne(req, res, next) {

    const { id } = req.params

    try {
        const deleted = await Service.destroy({ where: { id } })
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