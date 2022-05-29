const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')

dotenv.config()

const mssqlOldDb = new Sequelize({
    dialect: 'mssql',
    host: process.env.MSSQL_OLD_DB_HOST,
    username: process.env.MSSQL_OLD_DB_USER,
    password: process.env.MSSQL_OLD_DB_PWD,
    database: process.env.MSSQL_OLD_DB_DBNAME,
    dialectOptions: {
        options: {
            encrypt: false,
            enableArithAbort: false,
            cryptoCredentialsDetails: {
                minVersion: 'TLSv1'
            }
        }
    }

})

module.exports = mssqlOldDb