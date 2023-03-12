const WeightDataResult = require('../../types/WeightDataResult')
const { getRandomInt } = require('../../utils/index')

async function getWeightData() {

    const result = new WeightDataResult()
    result.value = getRandomInt(2100, 40000)
    return result

}

module.exports = getWeightData