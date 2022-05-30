const User = require('../models/User')


async function getAll(req, res) {

    const users = await User.findAll()
    return res.json(users)

}

async function getOne(req, res) {

    const { id } = req.params
    const user = await User.findOne({ where: { id } })
    return res.json(user)
}

async function create(req, res) {

    //return res.send(req.body)
    const newUser = await User.create(req.body)
    return res.json(newUser)


}

module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.create = create