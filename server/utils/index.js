const fs = require('fs')
const path = require('path')

const MAX_DATE = new Date(3000, 0, 1) //hello from 2023 :)

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

function subtractDays(days, fromDate = new Date()) {
    return new Date(fromDate - 1000 * 60 * 60 * 24 * days)
}

function startOfYear(date = new Date()) {
    //Функция возвращает начало года от переданной даты.
    return new Date(date.getFullYear(), 0, 1)
}

function parseDateRangeQueryParam(queryParam) {

    const result = queryParam.split('to').map((item, index) => {

        if (index === 0 && !item) {
            return new Date(null)

        } else if (index === 1 && !item) {
            return MAX_DATE

        } else {
            return new Date(item)
        }

    })

    if (result.length === 0) {
        throw new Error(`parseDateRangeQueryParam wrong parametr: ${queryParam}`)
    }

    return result
}

function addTimeZoneToDate(date = new Date(), tzOffset) {
    //Функция возвращает дату по UTC-0 учитывая тайм зону
    //tzOffset - число или число строкой, разница в минутах между UTC-0 и желаемой тайм зоной 
    return new Date(date.getTime() + parseInt(tzOffset) * 60 * 1000)
}

module.exports.MAX_DATE = MAX_DATE
module.exports.copyPhotos = copyPhotos
module.exports.subtractDays = subtractDays
module.exports.startOfYear = startOfYear
module.exports.parseDateRangeQueryParam = parseDateRangeQueryParam
module.exports.addTimeZoneToDate = addTimeZoneToDate