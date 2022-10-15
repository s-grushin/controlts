
function handleErrorMiddleware(err, req, res, next) {

    const statusCode = res.statusCode ? res.statusCode : 500
    const message = err.message || 'unknown error'

    console.log(err);

    res.status(statusCode).json({ message })

}

module.exports = handleErrorMiddleware