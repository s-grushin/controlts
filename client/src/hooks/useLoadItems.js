import { useState, useEffect, useCallback } from "react";


function useLoadItems(getAll) {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const loadItems = useCallback(async () => {

        try {
            const response = await getAll()
            setItems(response)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }

    }, [getAll])

    useEffect(() => {

        loadItems()

    }, [loadItems])

    return [items, setItems, loading, error]

}


export default useLoadItems