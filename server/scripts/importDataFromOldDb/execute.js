const mssql_old = require('./mssqlOldDb')
const mssql = require('../../db/mssql')
const { QueryTypes, where } = require('sequelize');
const dotenv = require('dotenv')
const colors = require('colors')
const Service = require('../../models/Service')
const Company = require('../../models/Company')

dotenv.config()

async function execute() {

    const OLD_DB_NAME = process.env.MSSQL_OLD_DB_DBNAME
    const DB_NAME = process.env.MSSQL_DBNAME

    try {
        await mssql_old.authenticate()
        console.log(`Успешное подключение к ${OLD_DB_NAME}`.green);
    } catch (error) {
        console.log(`Ошибка подключения к ${OLD_DB_NAME}`.red, error);
        return
    }

    try {
        await mssql.authenticate()
        await mssql.sync()
        console.log(`Успешное подключение к ${DB_NAME}`.green);
    } catch (error) {
        console.log(`Ошибка подключения к ${DB_NAME}`.red, error);
        return
    }

    try {
        await transferData()
        await mssql_old.close()
        console.log('Перенос данных успешно завершен!'.green);
    } catch (error) {
        console.log(`Ошибка при переносе данных ${error.name} ${error.message}`.red)
    } finally {
        process.exit(1)
    }

}

async function transferData() {
    console.log('Выполняется перенос данных. Подождите...'.green.bold);
    await transferServices()
    await transferCompanies()
}

async function transferServices() {
    const tb_cost_sprv = await mssql_old.query("SELECT * FROM tb_cost_sprv", { type: QueryTypes.SELECT });
    const data = tb_cost_sprv.map(item => {
        return {
            name: item.name,
            price: item.cost_over,
        }
    })

    await Service.destroy({ where: {} })
    await Service.bulkCreate(data)

}


async function transferCompanies() {
    const tb_firms = await mssql_old.query("SELECT * FROM tb_firms", { type: QueryTypes.SELECT });
    const data = tb_firms.filter(item => item.name_firm).map(item => {
        return {
            name: item.name_firm,
            edrpou: item.okpo,
        }
    })

    await Company.destroy({ where: {} })
    await Company.bulkCreate(data)
    
}

execute()