const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleMoveDetail = require('./VehicleMoveDetail')
const VehicleBrand = require('./VehicleBrand')
const VehicleModel = require('./VehicleModel')
const Driver = require('./Driver')
const Parking = require('./Parking')
const Company = require('./Company')
const DeliveryType = require('./DeliveryType')


const VehicleMove = db.define('VehicleMove', {

    dateOut: {
        type: DataTypes.DATE
    },
    comment: {
        type: DataTypes.STRING
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
        allowNull: false
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
    }

}, { timestamps: true, createdAt: 'dateIn' })


VehicleMove.hasMany(VehicleMoveDetail, { as: 'vehicleDetails', foreignKey: 'vehicleMoveId' })
VehicleMoveDetail.belongsTo(VehicleMove)

VehicleMove.belongsTo(VehicleModel, { foreignKey: 'modelId' })

VehicleMove.belongsTo(Driver, { as: 'driver', foreignKey: 'driverId' })

VehicleMove.belongsTo(Parking, { as: 'parking', foreignKey: 'parkingId' })

VehicleMove.belongsTo(Company, { as: 'company', foreignKey: 'companyId' })

VehicleMove.belongsTo(VehicleBrand, { as: 'brand', foreignKey: 'brandId' })

VehicleMove.belongsTo(VehicleModel, { as: 'model', foreignKey: 'modelId' })

VehicleMove.belongsTo(DeliveryType, { as: 'deliveryType', foreignKey: 'deliveryTypeId' })

module.exports = VehicleMove