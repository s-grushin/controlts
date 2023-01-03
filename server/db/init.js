const User = require('../models/User')
const Settings = require('../models/Settings')
const bcrypt = require('bcryptjs')
const colors = require('colors')

async function init() {

    await createRootUser()
    //await initSettings()
}

async function initSettings() {

    const defaultSettings = [
        { key: 'customZone', value: 'Таможенная зона', description: 'Название таможенной зоны для пропуска на вьезд' },
        { key: 'language', value: 'ru', description: 'Язык интерфейса' },
    ]

    for (const iterator of defaultSettings) {
        const item = await Settings.findOne({ where: { key: iterator.key } })
        if (!item || !item.value) {
            await Settings.create(iterator)
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