const { DataTypes } = require('sequelize')
const db = require('../db/mssql')

const Setting = db.define('Setting', {
    value: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    progName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
    },
})

module.exports = Setting