const User = require('../models/User')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')


async function getAllUsers(req, res, next) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0

    const users = await User.findAndCountAll({ attributes: { exclude: ['password'] }, limit, offset })
    return res.json(users)

}

async function getUserById(req, res) {

    const { id } = req.params
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })
    return res.json(user)

}

async function createUser(req, res) {

    const { username, password, role } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    let user
    user = await User.findOne({ where: { username } })
    if (user) {
        return res.status(400).json({ message: 'user is already exist' })
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    user = await User.create({ ...req.body, password: hashedPassword, role })
    res.status(200).json({ message: 'user created' })
}

async function updateUser(req, res) {

    // ignore password
    const fieldsToUpdate = Object.keys(req.body).filter(item => item !== 'password')

    const user = req.body
    await User.update(user, { where: { id: user.id }, fields: fieldsToUpdate })
    res.status(200).json({ message: 'user updated' })

}

async function deleteUser(req, res, next) {

    const { id } = req.body
    const deleted = await User.destroy({ where: { id } })
    if (deleted) {
        res.status(200).json({ message: 'user deleted' })
    } else {
        res.status(400).json({ message: 'user not found' })
    }

}

async function changePassword(req, res, next) {

    const { id, password, repeatPassword } = req.body
    console.log({id, password, repeatPassword});
    if (password !== repeatPassword || !password) {
        return res.status(400).json({ message: 'passwords not equals or empty' })
    }


    const hashedPassword = await bcrypt.hash(password, 5)

    const updated = await User.update({ password: hashedPassword }, { where: { id } })
    if (updated) {
        res.status(200).json({ message: 'password changed' })
    } else {
        res.status(400).json({ message: 'error on changing password' })
    }

}

async function changePassword(req, res, next) {

    const { id, password, repeatPassword } = req.body
    console.log({ id, password, repeatPassword });
    if (password !== repeatPassword || !password) {
        return res.status(400).json({ message: 'passwords not equals or empty' })
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    const updated = await User.update({ password: hashedPassword }, { where: { id } })
    if (updated) {
        res.status(200).json({ message: 'password changed' })
    } else {
        res.status(400).json({ message: 'error on changing password' })
    }

}

module.exports.getAllUsers = asyncHandler(getAllUsers)
module.exports.getUserById = asyncHandler(getUserById)
module.exports.createUser = asyncHandler(createUser)
module.exports.updateUser = asyncHandler(updateUser)
module.exports.deleteUser = asyncHandler(deleteUser)
module.exports.changePassword = asyncHandler(changePassword)