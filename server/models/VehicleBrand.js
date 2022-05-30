const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleBrand = db.define('VehicleBrand', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})

module.exports = VehicleBrand