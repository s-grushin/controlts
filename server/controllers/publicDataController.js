const asyncHandler = require('express-async-handler')
const User = require('../models/User')


async function getLoginUsers(req, res) {

    const users = await User.findAll({ attributes: { exclude: ['password', 'id'] }, limit, offset })
    return res.json(users)

}

module.exports.getAll = asyncHandler(getLoginUsers)