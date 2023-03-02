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
    moveKind: {
        //0 - въезд
        //1 - выезд
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isIn: [[0, 1]]
        }
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


VehicleMoveDetail.belongsTo(VehicleType, { as: 'vehicleType', foreignKey: 'vehicleTypeId' })

module.exports = VehicleMoveDetail