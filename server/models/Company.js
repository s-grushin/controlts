const { DataTypes } = require('sequelize')
const DriverHistory = require('./DriverHistory')
const VehicleMove = require('./VehicleMove')
const db = require('../db/mssql')

const Company = db.define('Company', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    edrpou: {
        type: DataTypes.STRING,
    },
    inn: {
        type: DataTypes.STRING,
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.edrpou) {
                return `${this.name} (${this.edrpou})`
            } else {
                return this.name
            }
        }
    }
})

Company.hasMany(DriverHistory, { as: 'driverHistory', foreignKey: { allowNull: false, name: 'companyId' } })
DriverHistory.belongsTo(Company, { as: 'company' })

Company.hasMany(VehicleMove, { as: 'vehicleMoves', foreignKey: { allowNull: false, name: 'companyId' } })
VehicleMove.belongsTo(Company, { as: 'company' })

module.exports = Company