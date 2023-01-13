const asyncHandler = require('express-async-handler')
const User = require('../models/User')


async function getLoginUsers(req, res) {

    const users = await User.findAll({ where: { isActive: true }, attributes: ['username', 'id'] })
    return res.json(users)

}

module.exports.getLoginUsers = asyncHandler(getLoginUsers)