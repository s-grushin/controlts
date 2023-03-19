const Camera = require('../../models/Camera')
const MoveRegistrationPhotoSettings = require('../../models/MoveRegistrationPhotoSettings')
const { copyPhotoToPublic, copyPhotoToTemp } = require('../../utils')
const getNomerokData = require('./nomerok')
const getTestData = require('./test')


const getCameraData = async () => {

    //returns array of objects {number, photoPath, regPhotoSettingsId}. number - это гос.номер,  photoPath - полный файловый путь фотографии 

    const regPhotoSettings = await MoveRegistrationPhotoSettings.findAll({ include: [{ model: Camera, as: 'camera' }], order: [['order']] })
    const promises = regPhotoSettings.map(async (item) => await getCameraDataByPath(item))
    const camerasData = await Promise.all(promises);
    return camerasData
}

const getCameraDataByPath = async (regPhotoSettingItem) => {
    // Функция должна возвращать объект класса CameraDataResult

    let cameraData

    if (process.env.TEST_CAMERA_DATA === '1') {
        cameraData = await getTestData(regPhotoSettingItem)
    } else {
        cameraData = await getNomerokData(regPhotoSettingItem)
    }
    cameraData.regPhotoSettingItem = regPhotoSettingItem

    const PHOTO_STORE_METHOD = process.env.PHOTO_STORE_METHOD

    if (PHOTO_STORE_METHOD === 'file') {
        // Метод хранения фотографий в файле, в БД будут хранится путь к папке public
        cameraData.photoUrl = await copyPhotoToPublic(cameraData.filePath, cameraData.fileName, cameraData.createdDate)

    } else if (PHOTO_STORE_METHOD === 'db') {
        // Метод хранения фотографий в базе данных, в папку temp необходимо копировать что бы на клиент передать ссылку, папка temp чистится автоматически со временем  
        cameraData.photoUrl = await copyPhotoToTemp(cameraData.filePath)

    } else {
        throw new Error('не назначен способ хранения фотографий')
    }



    return cameraData
}

module.exports = getCameraData