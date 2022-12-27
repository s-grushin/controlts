const { DataTypes } = require('sequelize')
const db = require('../db/mssql')

const Settings = db.define('Settings', {
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    value: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER
    },
})

module.exports = Settings