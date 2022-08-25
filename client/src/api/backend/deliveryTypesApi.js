import axios from 'axios'

const host = `${process.env.REACT_APP_SERVER}`

export const getAll = async (limit, offset) => {

    try {
        const response = await axios(`${host}/api/deliveryType?limit=${limit}&offset=${offset}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при получении списка видов доставок. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const getOne = async (id) => {

    try {
        const response = await axios(`${host}/api/deliveryType/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при отображении вида доставки. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const create = async (data) => {
    try {
        const response = await axios(`${host}/api/deliveryType/`, {
            method: 'post',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при создании вида доставки. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const update = async (data) => {
    try {
        const response = await axios(`${host}/api/deliveryType/`, {
            method: 'put',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при сохранении вида доставки. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const deleteOne = async (id) => {
    try {
        const response = await axios(`${host}/api/deliveryType/${id}`, {
            method: 'delete'
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при удалении вида доставки. ${error.message}. server: ${error.response.data.message}`)
    }
}