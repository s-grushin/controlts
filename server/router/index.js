const Router = require('express')
const userRouter = require('./user.router')
const serviceRouter = require('./service.router')
const companyRouter = require('./company.router')

const router = Router()
router.use('/user', userRouter)
router.use('/service', serviceRouter)
router.use('/company', companyRouter)


module.exports = router