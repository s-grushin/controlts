
import { useState, useEffect, createContext } from 'react'


const storageName = 'auth'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const login = (jwt, user) => {
        setToken(jwt)
        setUserInfo(user)
        localStorage.setItem(storageName, JSON.stringify({ token: jwt, userInfo: user }))
    }

    const logout = () => {
        setToken(null)
        setUserInfo(null)
        localStorage.removeItem(storageName)
    }

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token && data.userInfo) {
            login(data.token, data.userInfo)
        }

    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, token, userInfo, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider