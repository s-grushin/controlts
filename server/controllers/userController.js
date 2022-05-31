const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ApiResult = require('../utils/ApiResult')


async function getAll(req, res) {

    const users = await User.findAll()
    return res.json(users)

}

async function getOne(req, res) {

    const { id } = req.params
    const user = await User.findOne({ where: { id } })
    return res.json(user)
}

async function create(req, res, next) {

    try {
        const user = await User.create(req.body)
        return res.json(ApiResult.success(user))
    } catch (error) {
        next(ApiResult.badRequest(error.message))
    }


}

async function login(req, res) {

    const { login } = req.body
    const user = await User.findOne({ where: { login } })
    if (!user) {
        return res.send('user not exist')
    }

    return res.send(user)

}

module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.create = create
module.exports.login = login