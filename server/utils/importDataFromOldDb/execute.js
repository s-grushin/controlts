const mssql_old = require('./mssqlOldDb')
const { QueryTypes } = require('sequelize');
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config()

async function execute() {

    const OLD_DB_NAME = process.env.MSSQL_OLD_DB_DBNAME

    try {
        await mssql_old.authenticate()
        console.log(`Успешное подключение к ${OLD_DB_NAME}`.green);
    } catch (error) {
        console.log(`Ошибка подключения к ${OLD_DB_NAME}`.red, error);
        return
    }

    try {
        await transferData()
        await mssql_old.close()
        console.log('Перенос данных успешно завершен!'.green);
    } catch (error) {
        console.log('Ошибка при переносе данных'.red, error);
        process.exit(1)
    }

}

async function transferData() {
    console.log('Выполняется перенос данных. Подождите...'.green.bold);
    const users = await mssql_old.query("SELECT * FROM tb_users", { type: QueryTypes.SELECT });
}

execute()