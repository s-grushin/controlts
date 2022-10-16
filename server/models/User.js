const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fullName: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['USER', 'ADMIN', 'INSPECTOR']],
            notEmpty: true,
        },
        defaultValue: 'USER',
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