const { DataTypes } = require('sequelize')
const db = require('../db/mssql')

const VehicleType = db.define('VehicleType', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderInCheckout: {
        type: DataTypes.TINYINT,
        validate: {
            min: 1,
        }
    }
})

VehicleType.sync({ alter: true })

module.exports = VehicleType