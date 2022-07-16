import axios from 'axios'

const host = `${process.env.REACT_APP_SERVER}`

export const getAll = async (limit, offset) => {

    try {
        const response = await axios(`${host}/api/service?limit=${limit}&offset=${offset}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при получении списка услуг. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const getOne = async (id) => {

    try {
        const response = await axios(`${host}/api/service/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при отображении услуги. ${error.message}. server: ${error.response.data.message}`)
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

export const update = async (data) => {
    try {
        const response = await axios(`${host}/api/service/`, {
            method: 'put',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при сохранении услуги. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const deleteOne = async (id) => {
    try {
        const response = await axios(`${host}/api/service/${id}`, {
            method: 'delete'
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при удалении услуги. ${error.message}. server: ${error.response.data.message}`)
    }
}