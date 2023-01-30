const asyncHandler = require('express-async-handler')
const db = require('../db/mssql')
const { Op } = require("sequelize");
const { copyPhotos, subtractDays, startOfYear, parseQueryParamDateRange } = require('../utils')
const DeliveryType = require('../models/DeliveryType')
const VehicleMove = require('../models/VehicleMove')
const Parking = require('../models/Parking')
const DriverHistory = require('../models/DriverHistory')
const { getCameraData } = require('../services/nomerok')
const { getWeight } = require('../services/weight')
const VehicleMoveDetail = require('../models/VehicleMoveDetail')
const Driver = require('../models/Driver')
const VehicleBrand = require('../models/VehicleBrand')
const VehicleModel = require('../models/VehicleModel')
const Company = require('../models/Company')
const VehicleType = require('../models/VehicleType');
const User = require('../models/User');
const Constant = require('../models/Constant');


async function getAll(req, res) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0

    const where = {
        ...(req.query?.onTerritory && { dateOut: { [Op.is]: null } }),
        ...(req.query?.lastDays && { dateIn: { [Op.gte]: subtractDays(parseInt(req.query?.lastDays)) } }),
        ...(req.query?.thisYear && { dateIn: { [Op.gte]: startOfYear() } }),
        ...(req.query?.dateInRange && { dateIn: { [Op.between]: parseQueryParamDateRange(req.query?.dateInRange, req.query?.tzOffset) } }),
    }

    const data = await VehicleMove.findAndCountAll({
        where,
        limit,
        offset,
        order: [['dateIn', 'DESC']],
        include: [
            { model: Driver, as: 'driver' },
            { model: Parking, as: 'parking' },
            { model: VehicleBrand, as: 'brand' },
            { model: VehicleModel, as: 'model' },
            { model: DeliveryType, as: 'deliveryType' },
            { model: Company, as: 'company' },
            { model: User, as: 'userIn' },
            { model: User, as: 'userOut' },
            {
                model: VehicleMoveDetail,
                as: 'vehicleDetails', include: [
                    { model: VehicleType, as: 'vehicleType' }
                ]
            },
        ]
    })
    return res.json(data)
}

async function getById(req, res) {

    const { id } = req.params
    const data = await VehicleMove.findOne({ where: { id } })
    if (data) {
        return res.status(200).json(data)
    } else {
        return res.status(400).json({ message: 'not found' })
    }

}


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

async function getWeightAndCameraData(req, res) {

    const cameraData = await getCameraData()
    for (const item of cameraData) {
        const publicPhotoPath = await copyPhotos(item.filePath, item.file, item.birthTime)
        item.publicPhotoPath = publicPhotoPath
    }

    const weight = await getWeight()
    return res.status(200).json({ cameraData, weight })

}

async function getPhotos(req, res) {

    try {
        const data = await getCameraData()
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ message: `Не удалось получить фотографии. ${error.message}` })
    }

}

async function getCheckoutPassPrintData(req, res) {

    const { vehicleMoveId } = req.query

    if (!vehicleMoveId) {
        console.log('not provided');
        return res.status(400).json({ message: 'vehicleMoveId not provided' })
    }

    console.log(vehicleMoveId);

    const printData = {}

    printData.customZone = await Constant.findOne({ where: { name: 'customZone' }, attributes: ['value'] })
    printData.vm = await VehicleMove.findByPk(vehicleMoveId, {
        include: [
            { model: Driver, as: 'driver' },
            { model: Parking, as: 'parking' },
            { model: VehicleBrand, as: 'brand' },
            { model: VehicleModel, as: 'model' },
            { model: DeliveryType, as: 'deliveryType' },
            { model: Company, as: 'company' },
            { model: User, as: 'userIn' },
            { model: User, as: 'userOut' },
            {
                model: VehicleMoveDetail,
                as: 'vehicleDetails', include: [
                    { model: VehicleType, as: 'vehicleType' }
                ]
            },
        ]
    })

    try {
        return res.status(200).json({ printData })
    } catch (error) {
        return res.status(500).json({ message: `Не удалось получить фотографии. ${error.message}` })
    }

}

async function create(req, res) {

    const { brandId, modelId, weightIn, driverId, deliveryTypeId, parkingId, companyId, isOwnCompany, comment, vehicleDetails } = req.body

    if (!(brandId && modelId && driverId && deliveryTypeId && parkingId && companyId)) {
        return res.status(400).json({ message: 'Не заполнены обязательные поля!' })
    }

    const currentDate = new Date()

    //test
    const userInId = 1
    const userOutId = 1

    const number = vehicleDetails && vehicleDetails[0] && vehicleDetails[0].number

    await db.transaction(async (t) => {

        // Parking
        const parking = await Parking.findOne({ where: { id: parkingId }, lock: true, transaction: t })
        if (parking?.isBusy) {
            //throw new Error(`${parking.name} уже занято!`)
        }
        parking.isBusy = true
        await parking.save({ transaction: t })

        // Vehicle move
        const vehicleMove = await VehicleMove.create({
            brandId, modelId, weightIn, driverId, deliveryTypeId, parkingId, userInId, userOutId, isOwnCompany, comment, companyId, number
        }, { transaction: t })

        // Vehicle move Details
        const vmd = vehicleDetails.map(item => {
            return {
                number: item.number,
                photo: item.photoUrl,
                vehicleMoveId: vehicleMove.id,
                vehicleTypeId: item.vehicleTypeId
            }
        })
        await VehicleMoveDetail.bulkCreate(vmd, { transaction: t })

        // Driver history
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

    return res.json({ message: 'ok', data: asd })
}

module.exports.getCheckoutData = asyncHandler(getCheckoutData)
module.exports.getWeightAndCameraData = asyncHandler(getWeightAndCameraData)
module.exports.getPhotos = asyncHandler(getPhotos)
module.exports.getCheckoutPassPrintData = asyncHandler(getCheckoutPassPrintData)
module.exports.create = asyncHandler(create)
module.exports.getAll = asyncHandler(getAll)
module.exports.getById = asyncHandler(getById)
module.exports.test = asyncHandler(test)