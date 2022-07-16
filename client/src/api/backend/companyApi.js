import axios from 'axios'

const host = `${process.env.REACT_APP_SERVER}`

export const getAll = async (limit, offset) => {

    try {
        const response = await axios(`${host}/api/company?limit=${limit}&offset=${offset}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при получении списка компаний. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const getOne = async (id) => {

    try {
        const response = await axios(`${host}/api/company/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при отображении компании. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const create = async (data) => {
    try {
        const response = await axios(`${host}/api/company/`, {
            method: 'post',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при создании компании. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const update = async (data) => {
    try {
        const response = await axios(`${host}/api/company/`, {
            method: 'put',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при сохранении компании. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const deleteOne = async (id) => {
    try {
        const response = await axios(`${host}/api/company/${id}`, {
            method: 'delete'
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при удалении компании. ${error.message}. server: ${error.response.data.message}`)
    }
}