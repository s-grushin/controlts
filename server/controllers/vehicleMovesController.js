const asyncHandler = require('express-async-handler')
const db = require('../db/mssql')
const { Op } = require("sequelize");
const { parseDateRangeQueryParam, readFile, copyPhotoToTemp, getFileName, saveBinarytoTemp } = require('../utils')
const DeliveryType = require('../models/DeliveryType')
const VehicleMove = require('../models/VehicleMove')
const Parking = require('../models/Parking')
const DriverHistory = require('../models/DriverHistory')
const getCameraData = require('../services/getCameraData')
const getWeightData = require('../services/getWeight')
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
const Sequence = require('../models/Sequence');


async function getAll(req, res) {

    let limit = parseInt(req.query.limit) || 0
    let offset = parseInt(req.query.offset) || 0

    const where = {
        ...(req.query?.onTerritory && { dateOut: { [Op.is]: null } }),
        ...(req.query?.dateIn && { dateIn: { [Op.gte]: req.query.dateIn } }),
        ...(req.query?.dateInRange && { dateIn: { [Op.between]: parseDateRangeQueryParam(req.query.dateInRange) } }),
    }

    const data = await VehicleMove.findAndCountAll({
        where,
        limit,
        offset,
        order: [['dateIn', 'DESC']],
        include: vehicleMoveIncludes,
        distinct: true
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

    const cameraData = await getCameraData()
    return res.status(200).json(cameraData)
}

async function getWeight(req, res) {

    try {
        const weight = await getWeightData()
        return res.status(200).json(weight)
    } catch (error) {
        return res.status(500).json({ message: `Не удалось получить вес. ${error.message}` })
    }

}

async function calculateServices(req, res) {

    const result = {
        parking: {
            serviceId: null,
            quantity: 1,
            price: 0,
            summ: 0
        }
    }

    const { moveId } = req.query
    const move = await VehicleMove.findByPk(moveId)

    const parkingPerDay = await Service.findOne({ where: { progName: 'parkingPerDay' } })
    if (!parkingPerDay) {
        throw new Error('Не найдена услуга parkingPerDay')
    }
    const diffms = Date.now() - move.dateIn
    const days = diffms / 1000 / 60 / 60 / 24
    result.parking.serviceId = parkingPerDay.id
    result.parking.quantity = Math.round(days)
    result.parking.price = parkingPerDay.price
    result.parking.summ = result.parking.quantity * result.parking.price
    return res.status(200).json(result)
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

    const getPhotosPromises = printData.vm.vehicleDetails.filter(item => item.moveKind === 0).map(async (item) => await getPhotoFromDB(item.id))
    printData.photos = await Promise.all(getPhotosPromises)

    try {
        return res.status(200).json(printData)
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

async function prepareMoveDetails(moveDetails, vehicleMoveId, moveKind) {

    const prepared = moveDetails.map(async (item) => {

        const photo = await readFile(item.photoUrl)
        const fileName = getFileName(item.photoUrl)
        return {
            ...item,
            id: null,
            vehicleMoveId,
            moveKind,
            photo,
            fileName,
        }
    })

    return prepared
}

async function create(req, res) {

    const { brandId, modelId, weightIn, driverId, deliveryTypeId, parkingId, companyId, isOwnCompany, comment, vehicleDetails } = req.body

    if (!(brandId && modelId && driverId && deliveryTypeId && parkingId && companyId)) {
        return res.status(400).json({ message: 'Не заполнены обязательные поля!' })
    }

    const currentDate = new Date()


    const number = vehicleDetails && vehicleDetails[0] && vehicleDetails[0].number

    await db.transaction(async (t) => {

        const moveSequence = await Sequence.findOne({ where: { progName: 'move' }, transaction: t, lock: true })
        moveSequence.number = moveSequence.number + 1


        // Parking
        const parking = await Parking.findOne({ where: { id: parkingId }, lock: true, transaction: t })
        if (parking?.isBusy) {
            //throw new Error(`${parking.name} уже занято!`)
        }
        parking.isBusy = true
        await parking.save({ transaction: t })

        // Vehicle move
        const vehicleMove = await VehicleMove.create({
            brandId, modelId, weightIn, driverId, deliveryTypeId, parkingId,
            userInId: req.userId, isOwnCompany, comment, companyId, number,
            ticket: moveSequence.number
        }, { transaction: t })

        // Vehicle move Details
        const prepared = await prepareMoveDetails(vehicleDetails, vehicleMove.id, 0)
        const vmd = await Promise.all(prepared)
        await VehicleMoveDetail.bulkCreate(vmd, { transaction: t })

        // Driver history
        await DriverHistory.create({ date: currentDate, driverId, companyId, vehicleMoveId: vehicleMove.id }, { transaction: t })

        await moveSequence.save()

    })

    res.status(200).json({ message: 'created' })
}

async function checkout(req, res) {
    //Оформление выезда

    const { vehicleMoveId, vehicleDetails, weight, outgoPhotoDetailsIsDiff } = req.body

    await db.transaction(async (t) => {

        const vehicleMove = await VehicleMove.findByPk(vehicleMoveId, { lock: true, transaction: t })
        vehicleMove.weightOut = weight
        vehicleMove.dateOut = new Date()
        await vehicleMove.save({ transaction: t })

        if (outgoPhotoDetailsIsDiff) {
            await VehicleMoveDetail.destroy({ where: { vehicleMoveId, moveKind: 1 }, transaction: t })
            const prepared = await prepareMoveDetails(vehicleDetails, vehicleMoveId, 1)
            const vmd = await Promise.all(prepared)
            await VehicleMoveDetail.bulkCreate(vmd, { transaction: t })
        }
    })

    return res.status(200).json({ message: 'ok' })

}

async function getPhotoUrl(req, res) {

    const { moveDetailId } = req.query

    let photoUrl = await getPhotoFromDB(moveDetailId)

    return res.status(200).json(photoUrl)
}

async function getPhotoFromDB(moveDetailId) {

    let photoUrl

    const moveDetail = await VehicleMoveDetail.findByPk(moveDetailId)
    if (moveDetail) {
        if (moveDetail.photo) {
            const fileName = moveDetail.fileName || `photo_${Date.now()}.jpg`
            photoUrl = await saveBinarytoTemp(moveDetail.photo, fileName)
        }
    }
    return photoUrl
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
        ],
        attributes: ['id', 'number', 'vehicleMoveId', 'vehicleTypeId', 'moveKind']
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
module.exports.calculateServices = asyncHandler(calculateServices)
module.exports.getPhotoUrl = asyncHandler(getPhotoUrl)