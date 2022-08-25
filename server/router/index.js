const Router = require('express')
const userRouter = require('./user.router')
const serviceRouter = require('./service.router')
const companyRouter = require('./company.router')
const vehicleRouter = require('./vehicle.router')
const brandRouter = require('./brand.router')
const modelRouter = require('./model.router')
const parkingRouter = require('./parking.router')

const router = Router()
router.use('/user', userRouter)
router.use('/service', serviceRouter)
router.use('/company', companyRouter)
router.use('/vehicle', vehicleRouter)
router.use('/vehicle/brand', brandRouter)
router.use('/vehicle/model', modelRouter)
router.use('/parking', parkingRouter)



module.exports = router