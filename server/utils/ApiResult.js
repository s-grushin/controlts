class ApiResult {
    constructor(status, data) {
        this.status = status
        this.data = data
    }

    static error(data) {
        return new ApiResult('error', data)
    }

    static success(data) {
        return new ApiResult('success', data)
    }

}

module.exports = ApiResult