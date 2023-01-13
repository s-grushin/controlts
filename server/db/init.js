const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Constant = require('../models/Constant')
const colors = require('colors')

async function init() {

    await createRootUser()
    await fillConstants()
}

async function fillConstants() {

    const defaultSettings = [
        { name: 'customZone', value: 'Таможенная зона', description: 'Название таможенной зоны для пропуска на вьезд' },
    ]

    for (const item of defaultSettings) {
        const exists = await Constant.findOne({ where: { name: item.name } })
        if (!exists) {
            await Constant.create(item)
        }
    }
}

async function createRootUser() {

    let rootUser

    try {
        rootUser = await User.findOne({ where: { username: 'admin' } })
        if (!rootUser) {
            const hashedPassword = await bcrypt.hash('admin', 5)
            rootUser = await User.create({
                username: 'admin',
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