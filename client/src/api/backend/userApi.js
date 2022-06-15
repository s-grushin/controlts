import axios from 'axios'

const host = `${process.env.REACT_APP_SERVER}`

export const login = async (login, password) => {

}

export const logout = async () => {

}

export const getAll = async () => {

    const response = await axios(`${host}/api/user/`)
    return response.data

}

export const getOne = async (id) => {

    const response = await axios(`${host}/api/user/${id}`)
    return response.data

}

export const update = async (user) => {

    try {
        const response = await axios(`${host}/api/user`, {
            method: 'put',
            data: user
        })
        return response.data

    } catch (error) {
        throw new Error(`Ошибка сохранения пользователя. ${error.response.data.message || error.message}`)
    }
}

export const deleteOne = async (id) => {
    try {
        const response = await axios(`${host}/api/user/${id}`, {
            method: 'delete'
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при удалении пользователя. ${error.message}. server: ${error.response.data.message}`)
    }
}

export const create = async (data) => {
    try {
        const response = await axios(`${host}/api/user/`, {
            method: 'post',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при создании пользователя. ${error.message}. server: ${error.response.data.message}`)
    }
}

