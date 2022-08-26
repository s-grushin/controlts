const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const Driver = db.define('Driver', {
    fullName: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    phoneNumber1: {
        type: DataTypes.STRING
    },
    phoneNumber2: {
        type: DataTypes.STRING
    },
    comment: {
        type: DataTypes.STRING
    }
}, { underscored: true, timestamps: false })

module.exports = Driver