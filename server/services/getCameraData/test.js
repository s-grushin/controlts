const fs = require('fs').promises
const path = require('path')
const CameraDataResult = require("../../types/CameraDataResult");
const { getRandomInt } = require('../../utils/index')


function parseNumber(file) {
    // АС 1533 ВЕ.jpg
    let number
    number = file.split('.')[0]
    return number
}



async function getCameraDataByPath(rps) {

    const result = new CameraDataResult()

    const truckFolder = path.resolve(path.join('public', 'test-data', 'photos', 'truck'))
    const trailerFolder = path.resolve(path.join('public', 'test-data', 'photos', 'trailer'))

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