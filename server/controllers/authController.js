const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

async function login(req, res) {

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'Не заполнен логин или пароль' })
    }

    const user = await User.findOne({ where: { username } })
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if (isMatched) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        return res.json({
            token,
            userInfo: {
                id: user.id,
                username,
                fullName: user.fullName,
                role: user.role
            }

        })
    } else {
        res.status(400).json({ message: 'wrong password' })
    }
}

async function restoreAuth(req, res) {

    const { token } = req.body
    if (!token) {
        return res.status(400).json({ message: 'token required' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id
    const user = await User.findByPk(userId)

    return res.json({
        userInfo: {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            role: user.role
        }

    })
}


module.exports.login = asyncHandler(login)
module.exports.restoreAuth = asyncHandler(restoreAuth)