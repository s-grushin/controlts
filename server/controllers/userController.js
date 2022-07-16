const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const ApiError = require('../utils/ApiError')


async function getAll(req, res, next) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0

    try {
        const users = await User.findAndCountAll({ attributes: { exclude: ['password'] }, limit, offset })
        return res.json(users)
    } catch (error) {
        return next(ApiError.badRequest(error.message))
    }

}

async function getOne(req, res, next) {

    const { id } = req.params
    try {
        const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })
        return res.json(user)
    } catch (error) {
        return next(ApiError.badRequest(error.message))
    }
}

async function create(req, res, next) {

    const { login, password } = req.body
    try {

        let user
        user = await User.findOne({ where: { login } })
        if (user) {
            return res.json(ApiError.badRequest('that user is already exist'))
        }

        const hashedPassword = await bcrypt.hash(password, 5)
        user = await User.create({ ...req.body, password: hashedPassword })
        return res.json(user)

    } catch (error) {
        next(ApiError.badRequest(error.message))
    }

}

async function update(req, res, next) {

    // ignore password
    const fieldsToUpdate = Object.keys(req.body).filter(item => item !== 'password')

    const user = req.body
    try {
        const updated = await User.update(user, { where: { id: user.id }, fields: fieldsToUpdate })
        return res.json(updated)
    } catch (error) {
        next(ApiError.badRequest(error.message))
    }
}

async function deleteOne(req, res, next) {

    const { id } = req.body

    try {
        const deleted = await User.destroy({ where: { id } })
        return res.json(deleted)
    } catch (error) {
        next(ApiError.internalError(error.message))
    }
}

async function login(req, res, next) {

    const { login, password } = req.body
    const user = await User.findOne({ where: { login } })
    if (!user) {
        return next(ApiError.badRequest('user not found'))
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if (isMatched) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        return res.json({
            token,
            userInfo: {
                id: user.id,
                login,
                fullName: user.fullName,
                role: user.role
            }

        })
    } else {
        return next(ApiError.badRequest('wrong password'))
    }
}

async function changePassword(req, res, next) {

    const { id, password, repeatPassword } = req.body
    if (password !== repeatPassword) {
        return next(ApiError.badRequest('passwords not equals'))
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    try {
        const updated = await User.update({ password: hashedPassword }, { where: { id } })
        return res.json(updated)
    } catch (error) {
        next(ApiError.badRequest(error.message))
    }

}

module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.login = login
module.exports.deleteOne = deleteOne
module.exports.changePassword = changePassword