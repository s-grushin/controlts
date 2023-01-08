import { useState, useEffect, useCallback } from 'react'
import { createContext } from 'react'
import useHttp from '../hooks/useHttp'


export const AppGlobalDataContext = createContext()

const AUTH_TOKEN_KEY = 'authToken'

const AppGlobalDataProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [appSettings] = useState(null)

    const { request, loading, error } = useHttp()

    const login = async (username, password) => {
        const data = await request('auth/login', 'post', { username, password })
        if (data) {
            localStorage.setItem(AUTH_TOKEN_KEY, data.token)
            setIsAuth(true)
            setUserInfo(data.userInfo)
        }
    }

    const restoreAuth = useCallback(async () => {

        // When page refreshed need to restore auth
        const token = localStorage.getItem(AUTH_TOKEN_KEY)
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
        localStorage.removeItem(AUTH_TOKEN_KEY)
    }


    return (
        <AppGlobalDataContext.Provider value={{ isAuth, userInfo, login, logout, appSettings, loading, error }}>
            {children}
        </AppGlobalDataContext.Provider>
    )
}

export default AppGlobalDataProvider