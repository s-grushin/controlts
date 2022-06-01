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