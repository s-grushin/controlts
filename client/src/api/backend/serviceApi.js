import axios from 'axios'

const host = `${process.env.REACT_APP_SERVER}`

export const getAll = async () => {

    try {
        const response = await axios(`${host}/api/service/`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при получении списка услуг. ${error.message}. server: ${error.response.data.message}`)
    }

}

export const create = async (data) => {
    try {
        const response = await axios(`${host}/api/service/`, {
            method: 'post',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при создании услуги. ${error.message}. server: ${error.response.data.message}`)
    }
}