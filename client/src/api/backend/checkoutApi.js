import axios from 'axios'

const host = `${process.env.REACT_APP_SERVER}`

export const getCheckoutData = async () => {

    try {
        const response = await axios(`${host}/api/vehicleMove/getCheckoutData`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при получении данных. ${error.message}. server: ${error.response.data.message}`)
    }
}
