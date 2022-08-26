const VehicleModel = require('./VehicleModel')
const Driver = require('./Driver')


const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const DriverHistory = db.define('DriverHistory', {

    date: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }

}, { underscored: true, timestamps: false, tableName: 'driver_history' })

VehicleModel.belongsToMany(Driver, { through: 'DriverHistory' })
Driver.belongsToMany(VehicleModel, { through: 'DriverHistory' })


module.exports = DriverHistory