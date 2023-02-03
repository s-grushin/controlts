const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const Service = require('../models/Service')

const VehicleMoveService = db.define('VehicleMoveService', {
    vehicleMoveId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    summ: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
})

VehicleMoveService.belongsTo(Service, { foreignKey: 'serviceId' })

VehicleMoveService.sync({ force: true })

module.exports = VehicleMoveService