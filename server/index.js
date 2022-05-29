const express = require('express')
const mssql = require('./db/mssql')

const app = express()

const PORT = process.env.WEBSERVER_PORT || 5000


async function start() {

    try {
        await mssql.authenticate()
        console.log('mssql connection ok!');
        await runWebServer()
    } catch (error) {
        console.log('Error on starting server', error);
        process.exit(1)
    }

}


const runWebServer = () => {
    return new Promise((resolve) => {
        app.listen(PORT, () => {
            console.log(`Web server running on port ${PORT}`);
            resolve()
        })
    })
}

start()



