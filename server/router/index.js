const Router = require('express')
const usersRouter = require('./users.router')
const servicesRouter = require('./services.router')
const companiesRouter = require('./companies.router')
const vehicleBrandsRouter = require('./vehicleBrands.router')
const vehicleModelsRouter = require('./vehicleModels.router')
const parkingsRouter = require('./parkings.router')
const deliveryTypesRouter = require('./deliveryTypes.router')
const vehicleMovesRouter = require('./vehicleMoves.router')

const router = Router()
router.use('/users', usersRouter)
router.use('/services', servicesRouter)
router.use('/companies', companiesRouter)
router.use('/vehicle/brands', vehicleBrandsRouter)
router.use('/vehicle/models', vehicleModelsRouter)
router.use('/parkings', parkingsRouter)
router.use('/deliveryTypes', deliveryTypesRouter)
router.use('/vehicleMoves', vehicleMovesRouter)



module.exports = router