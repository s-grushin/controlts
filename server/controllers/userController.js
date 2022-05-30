async function getAll(req, res) {
    res.send('get all users')
}

async function getOne(req, res) {
    res.send('get one user')
}

async function create(req, res) {
    res.json({ result: 'ok' })
}




module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.create = create