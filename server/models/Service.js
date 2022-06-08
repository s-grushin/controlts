const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const Service = db.define('Service', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    costOver: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    costUnder: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    }
}, { underscored: true })


module.exports = Service