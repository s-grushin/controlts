const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')

dotenv.config()

const mssql = new Sequelize({
    dialect: 'mssql',
    host: process.env.MSSQL_HOST,
    username: process.env.MSSQL_USER,
    password: process.env.MSSQL_PWD,
    database: process.env.MSSQL_DBNAME,
    dialectOptions: {
        options: {
            encrypt: false,
            enableArithAbort: false,
            cryptoCredentialsDetails: {
                minVersion: 'TLSv1'
            }
        }
    },
    logging: false,

})

module.exports = mssql