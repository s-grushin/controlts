
class CameraDataResult {

    //move_registration_photo_setting item на основании которого были получены данные камеры
    regPhotoSettingItem

    //публичный путь к фотографии для клиента
    photoUrl = ''

    //парсеный гос.номер
    number = ''

    //это файловый путь где лежит файл
    filePath = ''

    //Имя файла
    fileName = ''

    //Дата создания файла
    createdDate
}

module.exports = CameraDataResult
