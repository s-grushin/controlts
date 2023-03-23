const fs = require('fs').promises
const path = require('path')

const MAX_DATE = new Date(3000, 0, 1) //hello from 2023 :)

async function copyPhotoToPublic(src, fileName, d = new Date()) {
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
    await fs.mkdir(destionationFolder, { recursive: true })
    const newPhotoPath = path.join(destionationFolder, fileName)
    await fs.copyFile(src, path.resolve(newPhotoPath))
    return newPhotoPath
}

async function copyPhotoToTemp(src) {

    const fileName = path.basename(src)
    const destination = path.join('public', 'temp', 'photo', fileName)
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await fs.copyFile(src, destination)
    return destination
}

async function saveBinarytoTemp(binary, fileName) {

    const destination = path.join(__dirname, '..', 'public', 'temp', 'photo', fileName)
    await fs.writeFile(destination, binary)
    return destination

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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

async function readFile(filePath) {
    const res = await fs.readFile(filePath)
    return res
}

function getFileName(file) {
    return path.basename(file)
}

function fakeDelay(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve(), ms))
}

module.exports.MAX_DATE = MAX_DATE
module.exports.copyPhotoToPublic = copyPhotoToPublic
module.exports.subtractDays = subtractDays
module.exports.startOfYear = startOfYear
module.exports.parseDateRangeQueryParam = parseDateRangeQueryParam
module.exports.addTimeZoneToDate = addTimeZoneToDate
module.exports.getRandomInt = getRandomInt
module.exports.readFile = readFile
module.exports.copyPhotoToTemp = copyPhotoToTemp
module.exports.getFileName = getFileName
module.exports.saveBinarytoTemp = saveBinarytoTemp
module.exports.fakeDelay = fakeDelay