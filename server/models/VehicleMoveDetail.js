const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleType = require('./VehicleType')

const VehicleMoveDetail = db.define('VehicleMoveDetail', {

    number: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    },
    vehicleMoveId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehicleTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

VehicleMoveDetail.belongsTo(VehicleType, { foreignKey: { allowNull: false } })

module.exports = VehicleMoveDetail