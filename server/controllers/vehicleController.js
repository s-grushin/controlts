const VehicleBrand = require('../models/VehicleBrand')
const VehicleModel = require('../models/VehicleModel')
const ApiError = require('../utils/ApiError')

async function getAll(req, res, next) {

    try {
        const data = await VehicleBrand.findAll({ include: 'models' })
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }

}

async function getAllBrands(req, res, next) {

    try {
        const data = await VehicleBrand.findAll({})
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }

}

async function getBrand(req, res, next) {

    const { id } = req.params
    try {
        const data = await VehicleBrand.findByPk(id, { include: ['models'] })
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }
}

async function createBrand(req, res, next) {

    try {
        const data = await VehicleBrand.create(req.body)
        return res.json(data)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }

}

async function updateBrand(req, res, next) {

    const data = req.body
    try {
        const updated = await VehicleBrand.update(data, { where: { id: data.id } })
        return res.json(updated)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }
}

async function deleteBrand(req, res, next) {

    const { id } = req.params

    try {
        const deleted = await VehicleBrand.destroy({ where: { id } })
        return res.json(deleted)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }
}


async function getAllModels(req, res, next) {

    try {
        const data = await VehicleModel.findAll()
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }

}


async function getModel(req, res, next) {

    const { id } = req.params
    try {
        const data = await VehicleModel.findByPk(id, { include: 'brand' })
        return res.json(data)
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }
}

async function createModel(req, res, next) {

    try {
        const data = await VehicleModel.create(req.body)
        return res.json(data)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }

}

async function updateModel(req, res, next) {

    const data = req.body
    try {
        const updated = await VehicleModel.update(data, { where: { id: data.id } })
        return res.json(updated)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }
}

async function deleteModel(req, res, next) {

    const { id } = req.params

    try {
        const deleted = await VehicleModel.destroy({ where: { id } })
        return res.json(deleted)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }
}


module.exports.getAll = getAll
module.exports.getAllBrands = getAllBrands
module.exports.getBrand = getBrand
module.exports.createBrand = createBrand
module.exports.updateBrand = updateBrand
module.exports.deleteBrand = deleteBrand

module.exports.getModel = getModel
module.exports.getAllModels = getAllModels
module.exports.createModel = createModel
module.exports.updateModel = updateModel
module.exports.deleteModel = deleteModel