const { DataTypes } = require('sequelize')
const db = require('../db/mssql')

const DriverHistory = db.define('DriverHistory', {

    date: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }

}, { tableName: 'driver_history' })

module.exports = DriverHistory