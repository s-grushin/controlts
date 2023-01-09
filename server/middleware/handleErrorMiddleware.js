
function handleErrorMiddleware(err, req, res, next) {

    let statusCode = res.statusCode ? res.statusCode : 500
    const message = err.message || 'unknown error'
    if (statusCode === 200 && message) {
        statusCode = 500
    }

    console.log(err.stack);

    res.status(statusCode).json({ message })
}

module.exports = handleErrorMiddleware