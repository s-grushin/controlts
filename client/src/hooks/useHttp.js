import { useState, useCallback } from 'react'
import axios from '../utils/axios'


const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [requestName, setRequestName] = useState('')

    const request = useCallback(async (url, method, data) => {
        try {
            setLoading(true)
            const res = await axios.request({ url, method, data })
            return res.data
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'unknown error')
        } finally {
            setLoading(false)
        }
    }, [])

    const clearError = useCallback(() => {
        setError('')
    }, [])

    //test
    // eslint-disable-next-line
    const requestWithDelay = useCallback((url, method, data, delay = 10000) => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const res = await axios.request({ url, method, data })
                resolve(res)
            }, delay)
        })
    }, [])

    return { request, loading, error, clearError, requestName, setRequestName }
}

export default useHttp