const ApiResult = require('../utils/ApiResult')

function apiErrorHandleMiddleware(err, req, res, next) {

    if (err instanceof ApiResult) {
        res.status(err.statusCode).json(err)
        return
    }

    res.status(500).json(ApiResult.internalError('something went wrong'))
}

module.exports = apiErrorHandleMiddleware