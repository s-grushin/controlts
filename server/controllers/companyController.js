const Company = require('../models/Company')
const ApiError = require('../utils/ApiError')

async function getAll(req, res, next) {

    try {
        const companies = await Company.findAll()
        return res.json(companies)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }

}

async function getOne(req, res, next) {

    const { id } = req.params
    try {
        const company = await Company.findOne({ where: { id } })
        return res.json(company)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }
}

async function create(req, res, next) {

    try {
        const company = await Company.create(req.body)
        return res.json(company)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }

}

async function update(req, res, next) {

    const company = req.body
    try {
        const updated = await Company.update(company, { where: { id: company.id } })
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