const { DataTypes } = require('sequelize')
const db = require('../db/mssql')

const Camera = db.define('Camera', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    progName: {
        type: DataTypes.STRING(50)
    },
    photosPath: {
        type: DataTypes.STRING,
    },

})

module.exports = Camera