const ApiError = require('../utils/ApiError')
const Company = require('../models/Company')
const { Op } = require('sequelize')

async function getAll(req, res, next) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0
    let searchValue = req.query.searchValue || ''

    try {
        const data = await Company.findAndCountAll({ limit, offset, where: { name: { [Op.substring]: searchValue } }, order: [['name']] })
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }

}

async function getOne(req, res, next) {

    const { id } = req.params
    try {
        const data = await Company.findOne({ where: { id } })
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }
}

async function create(req, res, next) {

    try {
        const data = await Company.create(req.body)
        return res.json(data)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }

}

async function update(req, res, next) {

    const data = req.body
    try {
        const updated = await Company.update(data, { where: { id: data.id } })
        return res.json(updated)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }
}

async function deleteOne(req, res, next) {

    const { id } = req.params

    try {
        const deleted = await Company.destroy({ where: { id } })
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