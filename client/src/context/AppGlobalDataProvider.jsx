import { useState, useEffect, useCallback } from 'react'
import { createContext } from 'react'
import { STORAGE_KEYS } from '../constants/appConstants'
import useHttp from '../hooks/useHttp'


export const AppGlobalDataContext = createContext()

const AppGlobalDataProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [authChecked, setAuthChecked] = useState(false) //need for saving url when page reload
    const [userInfo, setUserInfo] = useState(null)
    const [appSettings] = useState(null)

    const { request, loading, error, clearError, requestName, setRequestName } = useHttp()

    const login = async (username, password) => {

        setRequestName('login')
        const data = await request('auth/login', 'post', { username, password })
        if (data) {
            localStorage.setItem(STORAGE_KEYS.authToken, data.token)
            setIsAuth(true)
            setUserInfo(data.userInfo)
        }
    }

    const restoreAuth = useCallback(async () => {
        
        // When page refreshed need to restore auth
        const token = localStorage.getItem(STORAGE_KEYS.authToken)
        if (!token) {
            setAuthChecked(true)
            return
        }

        const data = await request('auth/restoreAuth', 'post', { token })
        if (data) {
            setIsAuth(true)
            setUserInfo(data.userInfo)
        }

        setAuthChecked(true)


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
            authChecked,
            userInfo,
            login,
            logout,
            restoreAuth,
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