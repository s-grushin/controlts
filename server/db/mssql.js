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
            },
            appName: 'ControlTC'
        },
    },
    logging: false,
    define: {
        timestamps: false,
        underscored: true,
    }
})

mssql.addHook('beforeBulkDestroy', async (options) => {

    const entry = await options.model.findByPk(options.where.id)
    if (entry?.dataValues?.progName) {
        throw new Error('Запрещено удалять предпределенные элементы')
    }

})

module.exports = mssql