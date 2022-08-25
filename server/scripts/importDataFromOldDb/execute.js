const mssql_old = require('./mssqlOldDb')
const mssql = require('../../db/mssql')
const { QueryTypes, where } = require('sequelize');
const dotenv = require('dotenv')
const colors = require('colors')
const Service = require('../../models/Service')
const Company = require('../../models/Company')
const VehicleBrand = require('../../models/VehicleBrand')
const VehicleModel = require('../../models/VehicleModel')
const Parking = require('../../models/Parking')


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
    //await transferServices()
    //await transferCompanies()
    //await transferVehicles()
    await transferParkings()
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

async function transferVehicles() {

    await VehicleBrand.destroy({ where: {} })
    await VehicleModel.destroy({ where: {} })

    const tb_name_ts = await mssql_old.query(`select max(id_name_ts) as id_name_ts, name, sum(1) as cnt from tb_name_ts 
    where name is not null and name <> ''
    group by name
    having sum(1) = 1`, { type: QueryTypes.SELECT });
    const tb_mod_ts = await mssql_old.query(`select * from tb_mod_ts where id_name is not null and mod_name <> ''`, { type: QueryTypes.SELECT });

    for (const brand of tb_name_ts) {

        const newBrand = await VehicleBrand.create({ name: brand.name.trim() })
        const models = tb_mod_ts.filter(item => item.id_name === brand.id_name_ts).map(item => {
            return {
                name: item.mod_name.trim(),
                weight: item.weight,
                isTruck: item.is_truck,
                brandId: newBrand.id
            }
        })

        const result = await VehicleModel.bulkCreate(models)
    }
}

async function transferParkings() {

    const tb_stay = await mssql_old.query("select * from tb_stay where id_proc is not null", { type: QueryTypes.SELECT });
    const data = tb_stay.map(item => {
        return {
            name: item.name,
            isBusy: item.buzy,
            number: item.num_stay,
        }
    })

    await Parking.destroy({ where: {} })
    await Parking.bulkCreate(data)

}

execute()