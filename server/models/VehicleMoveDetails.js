const { DataTypes } = require('sequelize')
const db = require('../db/mssql')

const VehicleMoveDetails = db.define('VehicleMoveDetails', {

    number: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    },

})

module.exports = VehicleMoveDetails