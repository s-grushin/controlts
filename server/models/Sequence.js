const { DataTypes } = require('sequelize')
const db = require('../db/mssql')
const Sequence = db.define('Sequence', {
    progName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['move']]
        },
        unique: true,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})



module.exports = Sequence