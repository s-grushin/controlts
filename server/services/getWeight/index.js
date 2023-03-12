const getTestData = require('./test')
const getIntertechnovesData = require('./intertechnoves')

async function getWeightData() {

    // Функция должна возвращать объект класса WeightDataResult
    if (process.env.TEST_WEIGHT_DATA === '1') {
        return await getTestData()
    } else {
        return await getIntertechnovesData()
    }
}


module.exports = getWeightData