const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Constant = require('../models/Constant')
const VehicleType = require('../models/VehicleType')

async function init() {

    await createRootUser()
    await fillConstants()
    await fillVehicleTypes()
}

async function fillConstants() {

    const constants = [
        { name: 'customZone', value: 'Таможенная зона', description: 'Название таможенной зоны для пропуска на вьезд' }
    ]

    for (const item of constants) {
        const exists = await Constant.findOne({ where: { name: item.name } })
        if (!exists) {
            await Constant.create(item)
        }
    }
}

async function fillVehicleTypes() {

    const vehicleTypes = [
        { name: 'Тягач', orderInCheckout: 1, progName: 'truck' },
        { name: 'Прицеп', orderInCheckout: 2, progName: 'trailer' },
        { name: 'Контейнер', orderInCheckout: null, progName: 'container' },
    ]

    for (const item of vehicleTypes) {
        const exists = await VehicleType.findOne({ where: { progName: item.progName } })
        if (!exists) {
            await VehicleType.create(item)
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