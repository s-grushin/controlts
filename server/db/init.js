const User = require('../models/User')
const bcrypt = require('bcryptjs')
const colors = require('colors')

async function init() {

    await createRootUser()
    await initSettings()
}

async function initSettings() {

    const defaultSettings = [
        { key: '', value: '', description: '' },
        { key: '', value: '', description: '' },
        { key: 'language', value: 'ru', description: 'Язык интерфейса' },
    ]



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