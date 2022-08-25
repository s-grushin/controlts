import axios from 'axios'

const host = `${process.env.REACT_APP_SERVER}`

export const getAll = async (limit, offset) => {

    try {
        const response = await axios(`${host}/api/parking?limit=${limit}&offset=${offset}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при получении списка мест стоянок. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const getOne = async (id) => {

    try {
        const response = await axios(`${host}/api/parking/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при отображении места стоянки. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const create = async (data) => {
    try {
        const response = await axios(`${host}/api/parking/`, {
            method: 'post',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при создании места стоянки. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const update = async (data) => {
    try {
        const response = await axios(`${host}/api/parking/`, {
            method: 'put',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при сохранении места стоянки. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const deleteOne = async (id) => {
    try {
        const response = await axios(`${host}/api/parking/${id}`, {
            method: 'delete'
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при удалении места стоянки. ${error.message}. server: ${error.response.data.message}`)
    }
}