const { DataTypes } = require('sequelize')
const DriverHistory = require('./DriverHistory')
const VehicleMove = require('./VehicleMove')
const db = require('../db/mssql')

const Driver = db.define('Driver', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber1: {
        type: DataTypes.STRING
    },
    phoneNumber2: {
        type: DataTypes.STRING
    },
    comment: {
        type: DataTypes.STRING
    }
}, { tableName: 'drivers' })

Driver.hasMany(DriverHistory, { as: 'driverHistory', onDelete: 'CASCADE' })
DriverHistory.belongsTo(Driver)

Driver.hasMany(VehicleMove, { as: 'vehicleMoves' })
VehicleMove.belongsTo(Driver, { as: 'driver' })

module.exports = Driver