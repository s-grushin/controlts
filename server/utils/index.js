const fs = require('fs')
const path = require('path')

async function copyPhotos(src, fileName, d = new Date()) {
    //src - полный путь к файлу. Пример C:\data\photo\front_camera\picture.jpg
    //fileName - имя файла. Пример picture.jpg
    //Возвращает новый путь к файлу

    //Функция копирует фото автомобилей из программы которая фотографирует в папку public сервера с разбиением по дням
    //так нужно, потому что на клиент передать путь к файлу из папки программы для фотографий напрямую невозможно
    //фотография копируется в папку /public/photo/year/month/day

    const year = d.getFullYear().toString()
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')

    const destionationFolder = path.join('public', 'photo', year, month, day)
    await fs.promises.mkdir(destionationFolder, { recursive: true })
    const newPhotoPath = path.join(destionationFolder, fileName)
    await fs.promises.copyFile(src, newPhotoPath)
    return newPhotoPath

    //console.log(path.join('public', 'photo', year, month, day, fileName));
    //await fs.promises.copyFile(src, path.join('public', fileName))

}

module.exports.copyPhotos = copyPhotos