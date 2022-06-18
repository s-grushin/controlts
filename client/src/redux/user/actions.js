import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from './constants'
import { login } from '../../api/backend/userApi'

export const login = (login, password) => async (dispatch) => {

    console.log('login');

    dispatch({ type: USER_LOGIN_REQUEST })

    try {
        const response = await login(login, password)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: response })
        localStorage.setItem('userInfo', JSON.stringify(response.data))

    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.message })
    }


}