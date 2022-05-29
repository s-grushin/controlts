const mssqlOldDb = require('./mssqlOldDb')

async function execute() {
    try {
        await mssqlOldDb.authenticate()        
    } catch (error) {
        console.log();        
    }
}

execute()