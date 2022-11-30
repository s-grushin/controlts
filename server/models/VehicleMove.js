const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleMoveDetail = require('./VehicleMoveDetail')
const DriverHistory = require('./DriverHistory')


const VehicleMove = db.define('VehicleMove', {

    dateOut: {
        type: DataTypes.DATE
    },
    comment: {
        type: DataTypes.STRING
    },
    isOwnCompany: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    weightIn: {
        type: DataTypes.INTEGER,
    },
    brandId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    modelId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weightOut: {
        type: DataTypes.INTEGER,
    },
    isOutAllowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

}, { timestamps: true, createdAt: 'date_in' })

VehicleMove.hasMany(VehicleMoveDetail, { as: 'vehicleDetails', foreignKey: { name: 'vehicle_move_id', allowNull: false } })
VehicleMoveDetail.belongsTo(VehicleMove, { foreignKey: { allowNull: false } })

VehicleMove.hasOne(DriverHistory, { foreignKey: { name: 'vehicleMoveId', allowNull: false } })
DriverHistory.belongsTo(VehicleMove)

module.exports = VehicleMove