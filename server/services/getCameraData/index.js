const Camera = require('../../models/Camera')
const MoveRegistrationPhotoSettings = require('../../models/MoveRegistrationPhotoSettings')
const { copyPhotoToPublic } = require('../../utils')
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
    cameraData.photoUrl = await copyPhotoToPublic(cameraData.filePath, cameraData.fileName, cameraData.createdDate)
    return cameraData
}

module.exports = getCameraData