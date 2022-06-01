class ApiError {
    constructor(statusCode, payload) {
        this.statusCode = statusCode
        this.payload = payload
    }

    static badRequest(payload) {
        return new ApiError(400, payload)
    }

    static unAuthorized(payload) {
        return new ApiError(401, payload)
    }

    static forbidden(payload) {
        return new ApiError(403, payload)
    }

    static notFound(payload) {
        return new ApiError(404, payload)
    }

    static internalError(payload) {
        return new ApiError(500, payload)
    }

}

module.exports = ApiError