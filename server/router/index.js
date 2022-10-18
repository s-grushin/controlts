const Router = require('express')
const usersRouter = require('./users.router')
const servicesRouter = require('./services.router')
const companiesRouter = require('./companies.router')
const vehiclesRouter = require('./vehicles.router')
const brandsRouter = require('./brands.router')
const modelsRouter = require('./models.router')
const parkingsRouter = require('./parkings.router')
const deliveryTypesRouter = require('./deliveryTypes.router')
const vehicleMovesRouter = require('./vehicleMoves.router')

const router = Router()
router.use('/users', usersRouter)
router.use('/services', servicesRouter)
router.use('/companies', companiesRouter)
router.use('/vehicles', vehiclesRouter)
router.use('/vehicles/brand', brandsRouter)
router.use('/vehicles/model', modelsRouter)
router.use('/parkings', parkingsRouter)
router.use('/deliveryTypes', deliveryTypesRouter)
router.use('/vehicleMoves', vehicleMovesRouter)



module.exports = router