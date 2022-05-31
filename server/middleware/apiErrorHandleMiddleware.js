const ApiError = require("../utils/ApiError");
const ApiResult = require('../utils/ApiResult')

function apiErrorHandleMiddleware(err, req, res, next) {

    if (err instanceof ApiError) {
        res.status(err.code).json(ApiResult.error(err.message))
        return
    }

    res.status(500).json(ApiResult.error('something went wrong'))
}

module.exports = apiErrorHandleMiddleware