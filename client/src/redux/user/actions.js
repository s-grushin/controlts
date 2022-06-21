import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from './constants'
import { login as loginApi } from '../../api/backend/userApi'

export const login = (login, password) => async (dispatch) => {

    dispatch({ type: USER_LOGIN_REQUEST })

    try {
        const data = await loginApi(login, password)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.message })
    }


}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}