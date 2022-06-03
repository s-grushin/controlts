const ApiError = require('../utils/ApiError')

async function getAll(req, res, next) {

    data = [
        {
            name: 'Проведення митного огляду',
            cost: 800,
        },
        {
            name: 'Без проведення митного огляду',
            cost: 600,
        },
        {
            name: "В'ізд для перевантаження",
            cost: 600,
        },
        {
            name: 'Механичне завантаження',
            cost: 25,
        },
        {
            name: 'Ручне завантаження',
            cost: 50,
        },
    ]
    //return next(ApiError.forbidden('not auth'))
    return res.json(data)

}


module.exports.getAll = getAll