import axios from 'axios'

const host = `${process.env.REACT_APP_SERVER}`

export const getAll = async () => {

    try {
        const response = await axios(`${host}/api/service/`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при получении услуг с сервера. ${error.message}. server: ${error.response.data.message}`)
    }

}