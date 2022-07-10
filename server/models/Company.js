const { DataTypes } = require('sequelize')
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
    }
}, { underscored: true })

module.exports = Company