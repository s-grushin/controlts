const ApiError = require('../utils/ApiError')

async function getAll(req, res, next) {

    data = [
        {
            id: 1,
            name: 'Проведення митного огляду',
            cost: 800,
        },
        {
            id: 2,
            name: 'Без проведення митного огляду',
            cost: 600,
        },
        {
            id: 3,
            name: "В'ізд для перевантаження",
            cost: 600,
        },
        {
            id: 4,
            name: 'Механичне завантаження',
            cost: 25,
        },
        {
            id: 5,
            name: 'Ручне завантаження',
            cost: 50,
        },
    ]
    //return next(ApiError.forbidden('not auth'))
    return res.json(data)

}


module.exports.getAll = getAll