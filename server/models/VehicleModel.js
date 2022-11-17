const { DataTypes } = require('sequelize')
const db = require('../db/mssql')

const VehicleModel = db.define('VehicleModel', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
    },
    isTruck: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
})

module.exports = VehicleModel