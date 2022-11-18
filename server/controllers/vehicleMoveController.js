const asyncHandler = require('express-async-handler')
const VehicleBrand = require('../models/VehicleBrand')
const DeliveryType = require('../models/DeliveryType')
const VehicleMove = require('../models/VehicleMove')
const Parking = require('../models/Parking')
const Driver = require('../models/Driver')
const Company = require('../models/Company')
const DriverHistory = require('../models/DriverHistory')

async function getCheckoutData(req, res) {

    const brands = await VehicleBrand.findAll({})
    const deliveryTypes = await DeliveryType.findAll({})
    const parkings = await Parking.findAll({ where: { isBusy: false } })
    return res.json({
        brands,
        deliveryTypes,
        parkings
    })
}

async function create(req, res) {

    const data = await Service.create(req.body)
    return res.status(200).json({ message: 'created' })

}

async function getDrivers(req, res) {
    // поиск водителей которые уже заезжали от имени текущей компании
    let searchValue = req.query.searchValue || ''

    const data = await DriverHistory.findAll({
        include: {
            model: 'company',
            where: {
                name: searchValue
            }
        }
    })
    return res.status(200).json({ data })
}



async function test(req, res) {
    //Driver.sync({ force: true })
    //DriverHistory.sync({ force: true })
    return res.json({ message: 'ok' })
}

async function getDriverHistory(modelId) {
    try {
        //const data = await db.query("select * from tb_in_type", { type: QueryTypes.SELECT });    
    } catch (error) {

    }
}


module.exports.getCheckoutData = asyncHandler(getCheckoutData)
module.exports.create = asyncHandler(create)
module.exports.test = asyncHandler(test)