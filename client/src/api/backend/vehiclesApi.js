import axios from 'axios'

const host = `${process.env.REACT_APP_SERVER}`

export const getAll = async (limit, offset) => {

    try {
        const response = await axios(`${host}/api/vehicle?limit=${limit}&offset=${offset}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при получении марок ТС. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const getBrand = async (id) => {

    try {
        const response = await axios(`${host}/api/vehicle/brand/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при отображении модели ТС. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const createBrand = async (data) => {
    try {
        const response = await axios(`${host}/api/vehicle/brand`, {
            method: 'post',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при создании модели ТС. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const updateBrand = async (data) => {
    try {
        const response = await axios(`${host}/api/vehicle/brand`, {
            method: 'put',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при сохранении модели ТС. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const deleteBrand = async (id) => {
    try {
        const response = await axios(`${host}/api/vehicle/brand/${id}`, {
            method: 'delete'
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при удалении модели ТС. ${error.message}. server: ${error.response.data.message}`)
    }
}


export const getModel = async (id) => {

    try {
        const response = await axios(`${host}/api/vehicle/model/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при отображении модели ТС. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const createModel = async (data) => {
    try {
        const response = await axios(`${host}/api/vehicle/model`, {
            method: 'post',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при создании модели ТС. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const updateModel = async (data) => {
    try {
        const response = await axios(`${host}/api/vehicle/model`, {
            method: 'put',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при сохранении модели ТС. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const deleteModel = async (id) => {
    try {
        const response = await axios(`${host}/api/vehicle/model/${id}`, {
            method: 'delete'
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при удалении модели ТС. ${error.message}. server: ${error.response.data.message}`)
    }
}