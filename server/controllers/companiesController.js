const Company = require('../models/Company')
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')

async function getAll(req, res) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0
    let searchValue = req.query.searchValue || ''

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

async function getDriverHistory(req, res) {

    const data = await Company.findOne({ include: 'driverHistory' })
    return res.status(200).json({ data })

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


module.exports.getAll = asyncHandler(getAll)
module.exports.getById = asyncHandler(getById)
module.exports.create = asyncHandler(create)
module.exports.update = asyncHandler(update)
module.exports.deleteOne = asyncHandler(deleteOne)