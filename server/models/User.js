const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const User = db.define('User', {
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    phoneNumber1: {
        type: DataTypes.STRING,
    },
    phoneNumber2: {
        type: DataTypes.STRING,
    }
})


module.exports = User