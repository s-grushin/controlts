const ApiError = require('../utils/ApiError')
const db = require('../db/mssql')
const VehicleBrand = require('../models/VehicleBrand')
const DeliveryType = require('../models/DeliveryType')
const Parking = require('../models/Parking')

async function getCheckoutData(req, res, next) {

    try {
        const brands = await VehicleBrand.findAll({})
        const deliveryTypes = await DeliveryType.findAll({})
        const parkings = await Parking.findAll({ where: { isBusy: false } })
        return res.json({
            brands,
            deliveryTypes,
            parkings
        })
    } catch (error) {
        return next(ApiError.internalError(error.message))
    }

}

async function getDriverHistory(modelId) {
    try {
        //const data = await db.query("select * from tb_in_type", { type: QueryTypes.SELECT });    
    } catch (error) {
        
    }
}



module.exports.getCheckoutData = getCheckoutData