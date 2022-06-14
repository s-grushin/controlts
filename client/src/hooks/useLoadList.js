import { useState, useEffect } from "react";


function useLoadList(getAll) {

    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    async function loadList() {

        try {
            const response = await getAll()
            setList(response)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }

    }


    useEffect(() => {

        loadList()

    }, [list])

    return [list, isLoading, error]

}


export default useLoadList