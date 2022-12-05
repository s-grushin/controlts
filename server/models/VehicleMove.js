const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const VehicleMoveDetail = require('./VehicleMoveDetail')
const DriverHistory = require('./DriverHistory')
const VehicleModel = require('./VehicleModel')


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

}, { timestamps: true, createdAt: 'date_in' })

VehicleMove.hasMany(VehicleMoveDetail, { foreignKey: { allowNull: false } })
VehicleMoveDetail.belongsTo(VehicleMove)

VehicleMove.belongsTo(VehicleModel, { foreignKey: 'modelId' })

module.exports = VehicleMove