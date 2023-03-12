const fs = require('fs').promises
const path = require('path')
const CameraDataResult = require("../../types/CameraDataResult");


function parseNumber(file) {
    // АС 1533 ВЕ.jpg
    let number
    number = file.split('.')[0]
    return number
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

async function getCameraDataByPath(rps) {

    const result = new CameraDataResult()

    const truckFolder = path.join('public', 'test-data', 'photos', 'truck')
    const trailerFolder = path.join('public', 'test-data', 'photos', 'trailer')

    const targetDir = rps.camera.progName === 'forTruck' ? truckFolder : trailerFolder

    const foundedFiles = await fs.readdir(targetDir)
    const file = foundedFiles[getRandomInt(0, foundedFiles.length - 1)]
    const fileStats = await fs.stat(path.join(targetDir, file))

    result.createdDate = fileStats.birthtime
    result.fileName = file
    result.filePath = path.join(targetDir, file)
    result.number = parseNumber(file)

    return result

}

module.exports = getCameraDataByPath