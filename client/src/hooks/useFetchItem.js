import { useState, useEffect, useCallback } from "react"
import useHttp from "./useHttp"

const useFetchItem = (url, delay) => {

    const { request, loading, error, clearError } = useHttp(false, delay)
    const [item, setItem] = useState(null)

    const fetchItem = useCallback(async () => {
        const item = await request(url)
        setItem(item)
    }, [request, url])

    useEffect(() => {

        fetchItem()

    }, [fetchItem, url])

    return { loading, error, clearError, item }
}

export default useFetchItem