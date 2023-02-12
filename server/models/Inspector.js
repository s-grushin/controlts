const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const User = require('./User')

const Inspector = db.define('Inspector', {

    //cdn - customs declaration number
    cdn: {
        type: DataTypes.STRING(50),
    },

    date: {
        type: DataTypes.DATE,
    },

    outgoAllowed: {
        type: DataTypes.BOOLEAN,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    vehicleMoveId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, { tableName: 'inspector' })

Inspector.belongsTo(User, { as: 'user', foreignKey: 'userId' })


module.exports = Inspector