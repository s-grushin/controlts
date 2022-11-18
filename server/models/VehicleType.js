const { DataTypes } = require('sequelize')
const db = require('../db/mssql')

const VehicleType = db.define('VehicleType', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = VehicleType