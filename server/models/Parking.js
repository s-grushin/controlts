const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const Parking = db.define('Parking', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    isBusy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, { underscored: true, tableName: 'parkings' })


module.exports = Parking