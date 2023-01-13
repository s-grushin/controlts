const { DataTypes } = require('sequelize')
const db = require('../db/mssql')

const Constant = db.define('Constant', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        unique: true
    },
    value: {
        type: DataTypes.STRING(100),
    },
    description: {
        type: DataTypes.STRING,
    }
})

module.exports = Constant