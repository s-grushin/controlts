const express = require('express')
const mssql = require('./db/mssql')
const appRouter = require('./router')
const dotenv = require('dotenv')
const colors = require('colors')
const errorHandleMiddleware = require('./middleware/apiErrorHandleMiddleware')

dotenv.config()

const PORT = process.env.WEBSERVER_PORT || 5000
const DBNAME = process.env.MSSQL_DBNAME

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', appRouter)
app.use(errorHandleMiddleware)



async function start() {

    try {
        await mssql.authenticate()
        console.log(`connected to ${DBNAME}`.green);
        await mssql.sync()
        await runWebServer()
    } catch (error) {
        console.log('Error on starting server'.red, error);
        process.exit(1)
    }

}


const runWebServer = () => {
    return new Promise((resolve) => {
        app.listen(PORT, () => {
            console.log(`Web server running on port ${PORT}`.green);
            resolve()
        })
    })
}

start()



