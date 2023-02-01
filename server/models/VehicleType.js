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
    },
    progName: {
        type: DataTypes.STRING(50)
    }

})

VehicleType.addHook('beforeBulkDestroy', (item, options) => {
    //console.log(item, options);
})

module.exports = VehicleType