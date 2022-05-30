const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleModel = db.define('VehicleModel', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})

module.exports = VehicleModel