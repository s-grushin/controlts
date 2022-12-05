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
    },
    brandId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


module.exports = VehicleModel