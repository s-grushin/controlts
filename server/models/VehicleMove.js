const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleMoveDetails = require('./VehicleMoveDetails')

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

}, { timestamps: true })

VehicleMove.hasMany(VehicleMoveDetails, { as: 'moveDetails', foreignKey: { name: 'vehicle_move_id', allowNull: false } })
VehicleMoveDetails.belongsTo(VehicleMove)

module.exports = VehicleMove