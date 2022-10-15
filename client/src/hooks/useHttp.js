import { useState, useCallback } from 'react'
import axios from '../utils/axios'


const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

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

    return { request, loading, error }
}

export default useHttp