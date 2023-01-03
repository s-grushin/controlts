const express = require('express')
const cors = require('cors')
const mssql = require('./db/mssql')
const apiRouter = require('./router')
const dotenv = require('dotenv')
const colors = require('colors')
const handleErrorMiddleware = require('./middleware/handleErrorMiddleware')
const dbInit = require('./db/init')


dotenv.config()

const PORT = process.env.WEBSERVER_PORT || 5000
const DBNAME = process.env.MSSQL_DBNAME

const app = express()
app.use(cors())
//app.use(express.static('public'))
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiRouter)
app.use(handleErrorMiddleware)

async function start() {
    try {
        await mssql.authenticate()
        console.log(`connected to ${DBNAME}`.green);
        await mssql.sync()
        //await mssql.sync({ force: true })
        await dbInit()
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



