import { useState, useCallback } from 'react'
import axios from '../utils/axios'
import useDelay from './useDelay'

const useHttp = (initLoading = false, delayMs) => {

    const [loading, setLoading] = useState(initLoading)
    const [error, setError] = useState('')
    const [requestName, setRequestName] = useState('')
    const { delay } = useDelay(delayMs)

    const request = useCallback(async (url, method, data) => {
        try {

            setLoading(true)

            if (delayMs) {
                await delay(delayMs)
            }

            const res = await axios.request({ url, method, data })
            return res.data
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'unknown error')
        } finally {
            setLoading(false)
        }
    }, [delay, delayMs])

    const clearError = useCallback(() => {
        setError('')
    }, [])

    return { request, loading, error, clearError, requestName, setRequestName }
}

export default useHttp