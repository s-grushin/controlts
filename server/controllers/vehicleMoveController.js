const asyncHandler = require('express-async-handler')
const db = require('../db/mssql')
const VehicleBrand = require('../models/VehicleBrand')
const DeliveryType = require('../models/DeliveryType')
const VehicleMove = require('../models/VehicleMove')
const Parking = require('../models/Parking')
const Driver = require('../models/Driver')
const Company = require('../models/Company')
const DriverHistory = require('../models/DriverHistory')
const VehicleMoveDetails = require('../models/VehicleMoveDetail')

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

    const { brandId, modelId, weightIn, driverId, deliveryTypeId, parkingId, companyId, isOwnCompany, comment } = req.body

    const currentDate = new Date()

    //test
    const userInId = 1
    const userOutId = 1


    await db.transaction(async (t) => {

        const vehicleMove = await VehicleMove.create({
            brandId, modelId, weightIn, driverId, deliveryTypeId, parkingId, userInId, userOutId, isOwnCompany, comment, companyId
        }, { transaction: t })

        await DriverHistory.create({ date: currentDate, driverId, companyId, vehicleMoveId: vehicleMove.id }, { transaction: t })

    })

    res.status(200).json({ message: 'created' })
}

async function test(req, res) {

    const data = [{
        number: 'AA 1234 XX',
        photo: '/asdasd.jpg',
        vehicleTypeId: 1,
    },
    {
        number: 'CC 5689 SS',
        photo: '/asdasd2.jpg',
        vehicleTypeId: 2,
    }]

    const vm = await VehicleMove.findByPk(1)

    try {
        const detail1 = await vm.createVehicleDetail(data[0])
        const detail2 = await vm.createVehicleDetail(data[1])
    } catch (error) {
        console.log(error);
        throw error
    }


    //const asd = await vm.addVehicleMoveDetails([detail1, detail2])

    //Driver.sync({ force: true })
    //DriverHistory.sync({ force: true })
    return res.json({ message: 'ok', data: asd })
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