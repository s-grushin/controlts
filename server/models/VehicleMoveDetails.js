const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleType = require('./VehicleType')

const VehicleMoveDetails = db.define('VehicleMoveDetails', {

    number: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    },

})

VehicleMoveDetails.belongsTo(VehicleType)

module.exports = VehicleMoveDetails