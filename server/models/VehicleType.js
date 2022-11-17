const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleMoveDetails = require('./VehicleMoveDetails')

const VehicleType = db.define('VehicleType', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

VehicleType.hasOne(VehicleMoveDetails)
VehicleMoveDetails.belongsTo(VehicleType)

module.exports = VehicleType