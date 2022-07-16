import { useState, useEffect, useCallback } from "react";


function useLoadItems(getAll) {

    const [items, setItems] = useState([])
    const [itemsCount, setItemsCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsOnPage = 20

    const loadItems = useCallback(async () => {

        try {
            setLoading(true)
            const response = await getAll(itemsOnPage, currentPage * itemsOnPage - itemsOnPage)
            setItems(response.rows)
            setItemsCount(response.count)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }

    }, [getAll, currentPage])

    useEffect(() => {

        loadItems()

    }, [loadItems, currentPage])

    return [items, setItems, loading, error, currentPage, setCurrentPage, itemsCount, itemsOnPage]

}


export default useLoadItems