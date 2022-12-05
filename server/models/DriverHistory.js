const { DataTypes } = require('sequelize')
const db = require('../db/mssql')

const DriverHistory = db.define('DriverHistory', {

    date: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    driverId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehicleMoveId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, { tableName: 'driver_history' })

module.exports = DriverHistory