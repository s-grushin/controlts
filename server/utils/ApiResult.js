class ApiResult {
    constructor(statusCode, data) {
        this.statusCode = statusCode
        this.data = data
    }

    static success(data) {
        return new ApiResult(200, data)
    }

    static badRequest(data) {
        return new ApiResult(400, data)
    }

    static unAuthorized(data) {
        return new ApiResult(401, data)
    }

    static forbidden(data) {
        return new ApiResult(403, data)
    }

    static notFound(data) {
        return new ApiResult(404, data)
    }

    static internalError(data) {
        return new ApiResult(500, data)
    }

}

module.exports = ApiResult