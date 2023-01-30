import { useState, useCallback } from 'react'
import axios from '../utils/axios'

const useHttp = (initLoading = false) => {

    const [loading, setLoading] = useState(initLoading)
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

    return { request, loading, error, clearError, requestName, setRequestName }
}

export default useHttp