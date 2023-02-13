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
const Setting = require('../models/Setting');
const Service = require('../models/Service');
const VehicleMoveService = require('../models/VehicleMoveService');
const Accountant = require('../models/Accountant');
const Inspector = require('../models/Inspector');


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

async function setPaid(req, res) {

    const { vehicleMoveId, isPaid } = req.body
    if (!vehicleMoveId) {
        return res.status(400).json({ message: 'vehicleMoveId no provided' })
    }

    try {
        const [accountant, created] = await Accountant.findOrCreate({
            where: { vehicleMoveId },
            include: [{ model: User, as: 'user', attributes: ['fullName'] }],
            defaults: { vehicleMoveId, isPaid, userId: req.userId, paidDate: new Date() }
        })

        if (!created) {
            accountant.isPaid = isPaid
            if (isPaid) {
                accountant.paidDate = new Date()
            }
            await accountant.save()
        }
        return res.status(200).json(accountant)
    } catch (error) {
        throw new Error(`Не удалось установить статус оплаты: ${error.message}`)
    }

}

async function setOutgo(req, res) {

    const { vehicleMoveId, cdn, outgoAllowed, weightIn, weightOut } = req.body
    if (!vehicleMoveId) {
        return res.status(400).json({ message: 'vehicleMoveId no provided' })
    }

    await db.transaction(async (t) => {

        try {
            const vehicleMove = await VehicleMove.findByPk(vehicleMoveId, { transaction: t, lock: true })
            vehicleMove.weightIn = weightIn
            vehicleMove.weightOut = weightOut
            await vehicleMove.save({ transaction: t })


            const [inspector, created] = await Inspector.findOrCreate({
                where: { vehicleMoveId },
                include: [{ model: User, as: 'user', attributes: ['fullName'] }],
                defaults: { vehicleMoveId, cdn, userId: req.userId, date: new Date(), outgoAllowed },
                transaction: t
            })

            if (!created) {
                inspector.outgoAllowed = outgoAllowed
                inspector.cdn = cdn
                if (outgoAllowed) {
                    inspector.date = new Date()
                }
                await inspector.save({ transaction: t })
            }
            return res.status(200).json(inspector)
        } catch (error) {
            throw new Error(`Не удалось установить данные выезда: ${error.message}`)
        }

    })

}

async function getCheckoutPassPrintData(req, res) {

    const { vehicleMoveId } = req.query

    if (!vehicleMoveId) {
        console.log('not provided');
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

    const { vmId, services } = req.body

    const servicesForCreate = services.map(item => {
        return {
            vehicleMoveId: vmId,
            serviceId: item.serviceId,
            quantity: item.quantity,
            price: item.price,
            summ: item.summ,
        }
    })

    await db.transaction(async (t) => {
        await VehicleMoveService.destroy({ where: { vehicleMoveId: vmId }, transaction: t })
        await VehicleMoveService.bulkCreate(servicesForCreate, { transaction: t })
    })

    return res.status(200).json({ message: 'ok' })
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


const vehicleMoveIncludes = [
    { model: Driver, as: 'driver' },
    { model: Parking, as: 'parking' },
    { model: VehicleBrand, as: 'brand' },
    { model: VehicleModel, as: 'model' },
    { model: DeliveryType, as: 'deliveryType' },
    { model: Company, as: 'company' },
    { model: User, as: 'userIn' },
    { model: User, as: 'userOut' },
    { model: Accountant, as: 'accountant', attributes: ['userId', 'paidDate', 'isPaid'], include: [{ model: User, as: 'user', attributes: ['fullName'] }] },
    { model: Inspector, as: 'inspector', include: [{ model: User, as: 'user', attributes: ['fullName'] }] },
    {
        model: VehicleMoveDetail,
        as: 'vehicleDetails', include: [
            { model: VehicleType, as: 'vehicleType' }
        ]
    },
    { model: VehicleMoveService, as: 'services', include: [{ model: Service, as: 'service' }] },
]

module.exports.getArrivalData = asyncHandler(getArrivalData)
module.exports.getWeightAndCameraData = asyncHandler(getWeightAndCameraData)
module.exports.getPhotos = asyncHandler(getPhotos)
module.exports.getCheckoutPassPrintData = asyncHandler(getCheckoutPassPrintData)
module.exports.getStartingServices = asyncHandler(getStartingServices)
module.exports.setPaid = asyncHandler(setPaid)
module.exports.setOutgo = asyncHandler(setOutgo)
module.exports.create = asyncHandler(create)
module.exports.saveServices = asyncHandler(saveServices)
module.exports.getAll = asyncHandler(getAll)
module.exports.getById = asyncHandler(getById)