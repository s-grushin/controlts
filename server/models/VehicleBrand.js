const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleModel = require('./VehicleModel')
const VehicleMove = require('./VehicleMove')
const VehicleBrand = db.define('VehicleBrand', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})

VehicleBrand.hasMany(VehicleModel, { as: 'models', foreignKey: 'brandId' })
VehicleModel.belongsTo(VehicleBrand, { foreignKey: 'brandId' })


VehicleBrand.hasMany(VehicleMove, { as: 'moves', foreignKey: 'brandId' })
VehicleMove.belongsTo(VehicleBrand, { foreignKey: 'brandId' })

module.exports = VehicleBrand