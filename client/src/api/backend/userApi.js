import axios from 'axios'

const host = `${process.env.REACT_APP_SERVER}`

export const login = async (login, password) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await axios.post(`${host}/api/users/login`, { login, password }, config)
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при логине пользователя. ${error.response.data.message || error.message}`)
    }

}

export const logout = async () => {

}

export const getAll = async (limit, offset) => {

    const response = await axios(`${host}/api/user?limit=${limit}&offset=${offset}`)
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
        const response = await axios(`${host}/api/user`, {
            method: 'delete',
            data: { id }
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

export const changePassword = async (data) => {
    try {
        const response = await axios(`${host}/api/user/${data.id}/password`, {
            method: 'put',
            data
        })
        return response.data
    } catch (error) {
        throw new Error(`Ошибка при изменении пароля. ${error.message}. server: ${error.response.data.message}`)
    }
}

