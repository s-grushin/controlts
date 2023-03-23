const VehicleMoveDetail = require('../models/VehicleMoveDetail')
const fs = require('fs/promises')
const path = require('path')
const { getRandomInt } = require('../utils')

async function execute() {

    const vmd = await VehicleMoveDetail.findAll()

    const truckFolder = path.join(__dirname, '..', 'public', 'test-data', 'photos', 'truck')
    const trailerFolder = path.join(__dirname, '..', 'public', 'test-data', 'photos', 'trailer')

    const trucks = await fs.readdir(truckFolder)
    const trailers = await fs.readdir(trailerFolder)


    const promises = vmd.map(async (item) => {

        const photo = item.vehicleTypeId === 1
            ? path.join(truckFolder, trucks[getRandomInt(0, trucks.length - 1)])
            : path.join(trailerFolder, trailers[getRandomInt(0, trailers.length - 1)])

        item.photo = await fs.readFile(photo)
        item.fileName = path.basename(photo)
        await item.save()
    })

    await Promise.all(promises)

}


execute()



