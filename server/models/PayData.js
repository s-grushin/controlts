const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const User = require('./User')

const PayData = db.define('PayData', {

    isPaid: {
        type: DataTypes.BOOLEAN,
    },

    paidDate: {
        type: DataTypes.DATE,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    vehicleMoveId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, { tableName: 'vehicle_move_paydata' })

PayData.belongsTo(User, { as: 'user', foreignKey: 'userId' })


module.exports = PayData