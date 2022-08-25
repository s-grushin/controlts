const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleModel = require('./VehicleModel')
const VehicleBrand = db.define('VehicleBrand', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, { underscored: true })

VehicleBrand.hasMany(VehicleModel, { as: 'models', foreignKey: 'brandId', onDelete: 'CASCADE' })
VehicleModel.belongsTo(VehicleBrand, { as: 'brand' })

module.exports = VehicleBrand