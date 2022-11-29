const Company = require('../models/Company')
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')
const DriverHistory = require('../models/DriverHistory')
const Driver = require('../models/Driver')
const VehicleMove = require('../models/VehicleMove')

async function getAll(req, res) {

    const limit = parseInt(req.query.limit) || 0
    const offset = parseInt(req.query.offset) || 0
    const searchValue = req.query.searchValue || ''

    const data = await Company.findAndCountAll(
        {
            limit,
            offset,
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: searchValue } },
                    { edrpou: { [Op.substring]: searchValue } },
                ]
            },
            order: [['name']]
        })
    return res.status(200).json(data)
}

async function getById(req, res) {

    const { id } = req.params
    const company = await Company.findOne({ where: { id } })
    if (company) {
        return res.status(200).json(company)
    } else {
        return res.status(400).json({ message: 'not found' })
    }

}

async function create(req, res) {

    const data = await Company.create(req.body)
    return res.status(200).json({ message: 'created', data })

}

async function update(req, res) {

    const data = req.body
    const updated = await Company.update(data, { where: { id: data.id } })
    if (updated) {
        return res.status(200).json({ message: 'updated' })
    } else {
        return res.status(400).json({ message: 'id not found' })
    }

}

async function deleteOne(req, res) {

    const { id } = req.body
    const deleted = await Company.destroy({ where: { id } })
    if (deleted) {
        return res.status(200).json({ message: 'deleted' })
    } else {
        return res.status(400).json({ message: 'id not found' })
    }

}

async function getDriverHistory(req, res) {

    const companyId = req.query.companyId
    const searchValue = req.query.searchValue || ''

    if (!companyId) {
        return res.status(400).json({ message: 'required company id' })
    }

    let data = await Company.findAndCountAll({
        where: { id: companyId },
        include: {
            model: VehicleMove,
            as: 'vehicleMoves',
            attributes: ['id'],
            include: {
                model: Driver,
                as: 'driver',
                attributes: ['id', 'fullName'],
                where: {
                    fullName: { [Op.substring]: searchValue },
                },
                order: [['fullName']]
            }
        }
    })

    //return res.status(200).json({ data })

    data = data.rows[0].vehicleMoves.map(item => ({
        id: item.driver.id,
        fullName: item.driver.fullName
    }))


    return res.status(200).json({ rows: data, count: data.length })

}


module.exports.getAll = asyncHandler(getAll)
module.exports.getById = asyncHandler(getById)
module.exports.create = asyncHandler(create)
module.exports.update = asyncHandler(update)
module.exports.deleteOne = asyncHandler(deleteOne)
module.exports.getDriverHistory = asyncHandler(getDriverHistory)