import { useState, useEffect, useCallback } from 'react'
import { createContext } from 'react'
import { STORAGE_KEYS } from '../constants/appConstants'
import useHttp from '../hooks/useHttp'


export const AppGlobalDataContext = createContext()

const AppGlobalDataProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [appSettings] = useState(null)

    const { request, loading, error, clearError, requestName, setRequestName } = useHttp()
    //const { request: requestLogin, error: errorLogin, clearError: clearLoginError } = useHttp()

    const login = async (username, password) => {

        const data = await request('auth/login', 'post', { username, password })
        if (data) {
            localStorage.setItem(STORAGE_KEYS.authToken, data.token)
            setRequestName('login')
            setIsAuth(true)
            setUserInfo(data.userInfo)
        }
    }

    const restoreAuth = useCallback(async () => {

        // When page refreshed need to restore auth
        const token = localStorage.getItem(STORAGE_KEYS.authToken)
        const data = await request('auth/restoreAuth', 'post', { token })
        if (data) {
            setIsAuth(true)
            setUserInfo(data.userInfo)
        }

    }, [request])

    useEffect(() => {

        restoreAuth()

    }, [restoreAuth])

    const logout = () => {
        setIsAuth(false)
        setUserInfo(null)
        localStorage.removeItem(STORAGE_KEYS.authToken)
    }


    return (
        <AppGlobalDataContext.Provider value={{
            isAuth,
            userInfo,
            login,
            logout,
            appSettings,
            loading,
            error,
            clearError,
            requestName,
            setRequestName
        }}>
            {children}
        </AppGlobalDataContext.Provider>
    )
}

export default AppGlobalDataProvider