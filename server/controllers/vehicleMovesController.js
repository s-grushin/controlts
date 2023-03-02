const asyncHandler = require('express-async-handler')
const db = require('../db/mssql')
const { Op } = require("sequelize");
const { copyPhotos, subtractDays, startOfYear, parseQueryParamDateRange } = require('../utils')
const DeliveryType = require('../models/DeliveryType')
const VehicleMove = require('../models/VehicleMove')
const Parking = require('../models/Parking')
const DriverHistory = require('../models/DriverHistory')
const { getCameraData } = require('../services/nomerok')
const { getWeightData } = require('../services/weight')
const VehicleMoveDetail = require('../models/VehicleMoveDetail')
const Driver = require('../models/Driver')
const VehicleBrand = require('../models/VehicleBrand')
const VehicleModel = require('../models/VehicleModel')
const Company = require('../models/Company')
const VehicleType = require('../models/VehicleType');
const User = require('../models/User');
const Setting = require('../models/Setting');
const Service = require('../models/Service');
const VehicleMoveService = require('../models/VehicleMoveService');
const PayData = require('../models/PayData');
const Outgo = require('../models/Outgo');


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
        include: vehicleMoveIncludes
    })
    return res.json(data)
}

async function getById(req, res) {

    const { id } = req.params
    const data = await VehicleMove.findOne({
        where: { id }, include: vehicleMoveIncludes
    })
    if (data) {
        return res.status(200).json(data)
    } else {
        return res.status(400).json({ message: 'not found' })
    }

}


async function getArrivalData(req, res) {

    const brands = await VehicleBrand.findAll({})
    const deliveryTypes = await DeliveryType.findAll({})
    const parkings = await Parking.findAll({ where: { isBusy: false } })
    return res.json({
        brands,
        deliveryTypes,
        parkings
    })
}

async function getPhotos(req, res) {

    try {
        const cameraData = await getCameraData()
        for (const item of cameraData) {
            const publicPhotoPath = await copyPhotos(item.filePath, item.file, item.birthTime)
            item.publicPhotoPath = publicPhotoPath
        }
        return res.status(200).json({ cameraData })
    } catch (error) {
        throw new Error(`Не удалось получить фотографии. ${error.message}`)
    }

}

async function getWeight(req, res) {

    try {
        const weight = await getWeightData()
        return res.status(200).json({ weight })
    } catch (error) {
        return res.status(500).json({ message: `Не удалось получить вес. ${error.message}` })
    }

}

async function savePayData(req, res) {

    const { vehicleMoveId } = req.body
    if (!vehicleMoveId) {
        return res.status(400).json({ message: 'vehicleMoveId no provided' })
    }

    await db.transaction(async (t) => {

        try {
            const [payData, created] = await PayData.findOrCreate({
                where: { vehicleMoveId },
                include: [{ model: User, as: 'user', attributes: ['fullName'] }],
                defaults: { vehicleMoveId, isPaid: true, userId: req.userId, paidDate: new Date() },
                transaction: t, lock: true
            })

            if (!created) {
                //record exist
                payData.isPaid = !payData.isPaid
                if (payData.isPaid) {
                    payData.paidDate = new Date()
                }
                await payData.save({ transaction: t })
            }
            return res.status(200).json(payData)
        } catch (error) {
            throw new Error(`Не удалось установить статус оплаты: ${error.message}`)
        }

    })

}

async function saveOutgo(req, res) {

    const { vehicleMoveId, cdn, outgoAllowed } = req.body
    if (!vehicleMoveId) {
        return res.status(400).json({ message: 'vehicleMoveId no provided' })
    }

    await db.transaction(async (t) => {

        try {
            const vehicleMove = await VehicleMove.findByPk(vehicleMoveId, { transaction: t, lock: true })
            await vehicleMove.save({ transaction: t })

            const [outgo, created] = await Outgo.findOrCreate({
                where: { vehicleMoveId },
                include: [{ model: User, as: 'user', attributes: ['fullName'] }],
                defaults: { vehicleMoveId, cdn, userId: req.userId, date: new Date(), outgoAllowed },
                transaction: t
            })

            if (!created) {
                outgo.outgoAllowed = outgoAllowed
                outgo.cdn = cdn
                if (outgo.outgoAllowed) {
                    outgo.date = new Date()
                }
                await outgo.save({ transaction: t })
            }
            return res.status(200).json(outgo)
        } catch (error) {
            throw new Error(`Не удалось установить данные выезда: ${error.message}`)
        }

    })

}

async function getCheckoutPassPrintData(req, res) {

    const { vehicleMoveId } = req.query

    if (!vehicleMoveId) {
        return res.status(400).json({ message: 'vehicleMoveId not provided' })
    }

    const printData = {}

    printData.customZone = await Setting.findOne({ where: { progName: 'customZone' }, attributes: ['value'] })
    printData.vm = await VehicleMove.findByPk(vehicleMoveId, {
        include: vehicleMoveIncludes
    })

    try {
        return res.status(200).json({ printData })
    } catch (error) {
        return res.status(500).json({ message: `Не удалось получить фотографии. ${error.message}` })
    }

}

async function getStartingServices(req, res) {

    const parkingPerDay = await Service.findOne({ where: { progName: 'parkingPerDay' } })
    return res.status(200).json([parkingPerDay])

}

async function saveServices(req, res) {

    const { vehicleMoveId, services } = req.body

    if (!vehicleMoveId) {
        throw new Error('vehicleMoveId not provided')
    }

    await db.transaction(async (t) => {
        await VehicleMoveService.destroy({ where: { vehicleMoveId }, transaction: t })
        const updatedServices = await VehicleMoveService.bulkCreate(services, { transaction: t })
        return res.status(200).json({ services: updatedServices })
    })

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
                photo: item.photo,
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

async function checkout(req, res) {
    //Оформление выезда

    const { vehicleMoveId, vehicleDetails, weight } = req.body

    await db.transaction(async (t) => {

        const vehicleMove = await VehicleMove.findByPk(vehicleMoveId, { lock: true })
        vehicleMove.weightOut = weight
        await vehicleMove.save({ transaction: t })

        await VehicleMoveDetail.destroy({ where: { vehicleMoveId, moveKind: 1 }, transaction: t })

        const vehicleDetailsToSave = vehicleDetails.map(item => {
            return {
                number: item.number,
                photo: item.photo,
                vehicleMoveId: vehicleMoveId,
                vehicleTypeId: item.vehicleTypeId,
                moveKind: 1,
            }
        })

        await VehicleMoveDetail.bulkCreate(vehicleDetailsToSave, { transaction: t })

    })

    return res.status(200).json({ message: 'ok' })

}

const getVehicleTypeByCameraName = (cameraName, vehicleTypes) => {

    let vt

    if (cameraName === 'front') {
        vt = vehicleTypes.find(item => item.progName === 'truck')
    }
    if (cameraName === 'back') {
        vt = vehicleTypes.find(item => item.progName === 'trailer')
    }

    return vt
}


const vehicleMoveIncludes = [
    { model: Driver, as: 'driver' },
    { model: Parking, as: 'parking' },
    { model: VehicleBrand, as: 'brand' },
    { model: VehicleModel, as: 'model' },
    { model: DeliveryType, as: 'deliveryType' },
    { model: Company, as: 'company' },
    { model: User, as: 'userIn' },
    { model: User, as: 'userOut' },
    { model: PayData, as: 'payData', attributes: ['userId', 'paidDate', 'isPaid'], include: [{ model: User, as: 'user', attributes: ['fullName'] }] },
    { model: Outgo, as: 'outgo', include: [{ model: User, as: 'user', attributes: ['fullName'] }] },
    {
        model: VehicleMoveDetail,
        as: 'vehicleDetails', 
        include: [
            { model: VehicleType, as: 'vehicleType' }
        ]
    },
    { model: VehicleMoveService, as: 'services', include: [{ model: Service, as: 'service' }] },
]

module.exports.getArrivalData = asyncHandler(getArrivalData)
module.exports.getPhotos = asyncHandler(getPhotos)
module.exports.getWeight = asyncHandler(getWeight)
module.exports.getCheckoutPassPrintData = asyncHandler(getCheckoutPassPrintData)
module.exports.getStartingServices = asyncHandler(getStartingServices)
module.exports.saveOutgo = asyncHandler(saveOutgo)
module.exports.create = asyncHandler(create)
module.exports.checkout = asyncHandler(checkout)
module.exports.saveServices = asyncHandler(saveServices)
module.exports.savePayData = asyncHandler(savePayData)
module.exports.getAll = asyncHandler(getAll)
module.exports.getById = asyncHandler(getById)