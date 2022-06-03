const Router = require('express')
const userRouter = require('./user.router')
const serviceRouter = require('./service.router')

const router = Router()
router.use('/user', userRouter)
router.use('/service', serviceRouter)


module.exports = router