const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const User = require('./User')

const Accountant = db.define('Accountant', {

    isPaid: {
        type: DataTypes.BOOLEAN,
    },

    paidDate: {
        type: DataTypes.DATE,
    },

    accountantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    vehicleMoveId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, { tableName: 'accountant' })

Accountant.belongsTo(User, { foreignKey: 'accountantId' })


module.exports = Accountant