const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleMoveDetail = require('./VehicleMoveDetail')
const VehicleBrand = require('./VehicleBrand')
const VehicleModel = require('./VehicleModel')
const Driver = require('./Driver')
const Parking = require('./Parking')
const Company = require('./Company')
const DeliveryType = require('./DeliveryType')
const User = require('./User')
const VehicleMoveService = require('./VehicleMoveService')
const PayData = require('./PayData')
const Outgo = require('./Outgo')
const Sequence = require('./Sequence')


const VehicleMove = db.define('VehicleMove', {

    dateOut: {
        type: DataTypes.DATE
    },
    comment: {
        type: DataTypes.TEXT
    },
    number: {
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
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Не указана марка авто'
            }
        }
    },
    modelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Не указана модель авто'
            }
        }
    },
    weightOut: {
        type: DataTypes.INTEGER,
    },
    isOutAllowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userInId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userOutId: {
        type: DataTypes.INTEGER,
    },
    parkingId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deliveryTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Не указана компания'
            }
        }
    },
    driverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Не указан водитель'
            }
        }
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    outgoPhotoDetailsIsDiff: {
        // Признак того что фото и номер отличается от въезда
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ticket: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

}, { timestamps: true, createdAt: 'dateIn' })


VehicleMove.hasMany(VehicleMoveDetail, { as: 'vehicleDetails', foreignKey: 'vehicleMoveId' })
VehicleMoveDetail.belongsTo(VehicleMove)

VehicleMove.hasMany(VehicleMoveService, { as: 'services', foreignKey: 'vehicleMoveId' })
VehicleMoveService.belongsTo(VehicleMove)

VehicleMove.belongsTo(VehicleModel, { foreignKey: 'modelId' })

VehicleMove.belongsTo(Driver, { as: 'driver', foreignKey: 'driverId' })

VehicleMove.belongsTo(Parking, { as: 'parking', foreignKey: 'parkingId' })

VehicleMove.belongsTo(Company, { as: 'company', foreignKey: 'companyId' })

VehicleMove.belongsTo(VehicleBrand, { as: 'brand', foreignKey: 'brandId' })

VehicleMove.belongsTo(VehicleModel, { as: 'model', foreignKey: 'modelId' })

VehicleMove.belongsTo(DeliveryType, { as: 'deliveryType', foreignKey: 'deliveryTypeId' })

VehicleMove.belongsTo(User, { as: 'userIn', foreignKey: 'userInId' })

VehicleMove.belongsTo(User, { as: 'userOut', foreignKey: 'userOutId' })

VehicleMove.hasOne(PayData, { as: 'payData', foreignKey: 'vehicleMoveId' })
PayData.belongsTo(VehicleMove, { foreignKey: 'vehicleMoveId' })

VehicleMove.hasOne(Outgo, { as: 'outgo', foreignKey: 'vehicleMoveId' })
Outgo.belongsTo(VehicleMove, { foreignKey: 'vehicleMoveId' })


module.exports = VehicleMove