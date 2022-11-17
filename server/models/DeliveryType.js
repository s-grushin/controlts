const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const DeliveryType = db.define('DeliveryType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, { tableName: 'deliveryTypes' })


module.exports = DeliveryType