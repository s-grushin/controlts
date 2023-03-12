const fs = require('fs').promises
const path = require('path')
const dotenv = require('dotenv')
const CameraDataResult = require('../../types/CameraDataResult')
dotenv.config()

function parseNumber(file) {
    let number                       // 2022_12_12_19_10_01_488_2_1_1-ВВ1111HT_UA_0.jpg
    number = file.split('-')[1]      // ВВ1111HT_UA_0.jpg
    number = number.split('.')[0]    // ВВ1111HT_UA_0
    number = number.split('_')[0]    // ВВ1111HT        
    return number
}

async function getCameraDataByPath(rps) {
    // Функция получает крайние по дате создания фото
    //Пример пути где лежат фото для софта "Номерок"
    //Тягач: camera.photoPath + '\' + DirCurrentYear + '.' + DirCurrentMonth + '\' + DirCurrentDay + '\2\02\';
    //Прицеп: camera.photoPath + '\' + DirCurrentYear + '.' + DirCurrentMonth + '\' + DirCurrentDay + '\2\01\';

    const result = new CameraDataResult()

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')


    const lastFolder = rps.camera.progName === 'forTruck' ? '02' : rps.camera.progName === 'forTrailer' ? '01' : null
    if (!lastFolder)
        throw new Error('lastFolder not defined')


    const targetDir = path.join(rps.camera.photoPath, `${year.toString()}.${month.toString()}`, day.toString(), '2', lastFolder)
    const foundedFiles = await fs.readdir(targetDir)

    if (foundedFiles.length === 0) {
        throw new Error(`не найдено фотографии в каталоге ${targetDir}`)
    }

    const foundedFilesWithStats = []

    for (const file of foundedFiles) {

        if (file === 'Thumbs.db') continue


        const filePath = path.join(targetDir, file)
        const fileStats = await fs.stat(filePath)
        foundedFilesWithStats.push({ filePath, file, birthTime: fileStats.birthtime })
    }

    foundedFilesWithStats.sort((a, b) => a.birthTime - b.birthTime)

    const last = foundedFilesWithStats[foundedFilesWithStats.length - 1]
    try {
        result.number = parseNumber(last.file)
    } catch (error) {
        throw new Error(`ошибка разбора номера ${last.filePath}`)
    }

    result.filePath = last.filePath
    result.fileName = last.file
    result.createdDate = last.birthTime

    return result

}

async function getCameraData() {

    // Функция получает крайние по дате созданные фото

    //frontPhotoFolder := DirFotoFront + '\' + DirCurrentYear + '.' + DirCurrentMonth + '\' + DirCurrentDay + '\2\02\';

    const FRONT_PHOTO_DIR = process.env.FRONT_PHOTO_DIR
    const BACK_PHOTO_DIR = process.env.BACK_PHOTO_DIR
    if (!FRONT_PHOTO_DIR && !BACK_PHOTO_DIR) {
        throw new Error('Не заданы параметры FRONT_PHOTO_DIR и BACK_PHOTO_DIR в файле .env')
    }

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')


    const combinedDir = [{ path: FRONT_PHOTO_DIR, cameraName: 'front' }, { path: BACK_PHOTO_DIR, cameraName: 'back' }]

    const photos = []

    for (const dir of combinedDir) {

        const tempPhotoDir = []

        const targetDir = path.join(dir.path, `${year.toString()}.${month.toString()}`, day.toString())
        const foundedFiles = await fs.readdir(targetDir)

        for (const file of foundedFiles) {
            const filePath = path.join(targetDir, file)
            const fileStats = await fs.stat(filePath)
            tempPhotoDir.push({ filePath, file, birthTime: fileStats.birthtime })
        }

        tempPhotoDir.sort((a, b) => a.birthTime - b.birthTime)
        photos.push({ ...tempPhotoDir[tempPhotoDir.length - 1], cameraName: dir.cameraName })
    }

    for (const photo of photos) {
        try {
            photo.number = parseNumber(photo.file)
        } catch (error) {
            photo.number = ''
        }
    }

    return photos
}

module.exports.getCameraData = getCameraData
module.exports = getCameraDataByPath