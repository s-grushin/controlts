const Router = require('express')
const usersRouter = require('./users.router')
const serviceRouter = require('./service.router')
const companyRouter = require('./company.router')
const vehicleRouter = require('./vehicle.router')
const brandRouter = require('./brand.router')
const modelRouter = require('./model.router')
const parkingRouter = require('./parking.router')
const deliveryTypeRouter = require('./deliveryType.router')
const vehicleMoveRouter = require('./vehicleMove.router')

const router = Router()
router.use('/users', usersRouter)
router.use('/service', serviceRouter)
router.use('/company', companyRouter)
router.use('/vehicle', vehicleRouter)
router.use('/vehicle/brand', brandRouter)
router.use('/vehicle/model', modelRouter)
router.use('/parking', parkingRouter)
router.use('/deliveryType', deliveryTypeRouter)
router.use('/vehicleMove', vehicleMoveRouter)



module.exports = router