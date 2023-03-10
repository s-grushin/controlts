const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const Camera = require('./Camera')
const VehicleType = require('./VehicleType')

const MoveRegistrationPhotoSettings = db.define('MoveRegistrationPhotoSettings', {

    cameraId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vehicleTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order: {
        type: DataTypes.TINYINT,
        validate: {
            min: 1,
        }
    },
})

MoveRegistrationPhotoSettings.belongsTo(Camera, { as: 'camera', foreignKey: 'cameraId' })
MoveRegistrationPhotoSettings.belongsTo(VehicleType, { as: 'vehicleType', foreignKey: 'vehicleTypeId' })


module.exports = MoveRegistrationPhotoSettings