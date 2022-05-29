const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const Driver = db.define('Driver', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})

module.exports = Driver