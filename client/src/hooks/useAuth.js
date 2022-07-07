import { useState, useEffect, useCallback } from "react"

const storageName = 'userInfo'

const useAuth = () => {

    const [token, setToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const login = useCallback((jwt, user) => {
        setToken(jwt)
        setUserInfo(user)
        localStorage.setItem(storageName, JSON.stringify({ token: jwt, userInfo: user }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserInfo(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userInfo)
        }
    }, [])


    return { token, userInfo, login, logout }
}

export default useAuth