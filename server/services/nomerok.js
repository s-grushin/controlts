const fs = require('fs').promises
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

function parseNumber(file) {
    let number                       // 2022_12_12_19_10_01_488_2_1_1-ВВ1111HT_UA_0.jpg
    number = file.split('-')[1]      // ВВ1111HT_UA_0.jpg
    number = number.split('.')[0]    // ВВ1111HT_UA_0
    number = number.split('_')[0]    // ВВ1111HT        
    return number
}

async function getCameraData() {

    // Функция получает крайние по дате созданные фото

    //frontPhotoFolder := DirFotoFront + '\' + DirCurrentYear + '.' + DirCurrentMonth + '\' + DirCurrentDay + '\2\02\';

    const FRONT_PHOTO_DIR = process.env.FRONT_PHOTO_DIR
    const BACK_PHOTO_DIR = process.env.BACK_PHOTO_DIR
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()


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
        photo.number = parseNumber(photo.file)
    }

    return photos
}

module.exports.getCameraData = getCameraData