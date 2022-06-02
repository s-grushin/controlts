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
        throw `Ошибка сохранения пользователя. ${error.response.data.message || error.message}`
    }
}

