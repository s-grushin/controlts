const User = require('../models/User')
const bcrypt = require('bcryptjs')
const colors = require('colors')

async function init() {

    let rootUser

    try {
        rootUser = await User.findOne({ where: { login: 'admin' } })
        if (!rootUser) {
            const hashedPassword = await bcrypt.hash('admin', 5)
            rootUser = await User.create({
                login: 'admin',
                password: hashedPassword,
                role: 'ADMIN',
            })
            console.log(`admin user created! login:admin password:admin`.green);
        }
    } catch (error) {
        throw new Error(`error on creating root user. ${error.message}`.red)
    }
}

module.exports = init