const jwt = require('jsonwebtoken')

function checkAuth(req, res, next) {

    let header = req.headers.authorization || "";
    try {
        const decoded = jwt.decode(header.split(" ")[1]);
        req.userId = decoded.id;
    } catch (error) {
        res.status(401) 
        throw new Error('access denied')
    }
    next()
}

module.exports = checkAuth