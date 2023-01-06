const { DataTypes } = require('sequelize')
const DriverHistory = require('./DriverHistory')
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

Company.hasMany(DriverHistory, { as: 'driverHistory' })
DriverHistory.belongsTo(Company)

module.exports = Company