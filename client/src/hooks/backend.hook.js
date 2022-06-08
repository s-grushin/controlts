import { useState, useEffect } from "react";

function useFetchBackend(apiFunc) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function apiFetch() {
        try {
            const json = await apiFunc()
            setData(json);
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        apiFetch();

        // eslint-disable-next-line
    }, []);

    return [data, loading, error]
}

function fakeRequest() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('dummy data from server')
        }, 2000);
    })
}

function useLoadData(backendApiFunc) {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    async function fetchBackend() {
        try {
            const response = await backendApiFunc()
            setData(response)
        } catch (error) {
            setIsError(true)
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        fetchBackend()

    }, [])

    return [isLoading, data, isError, errorMessage]
}

function useSaveData(data, backendApiFunc, navigatePath) {

    const [isSaving, setIsSaving] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const saveData = async () => {

        setIsSaving(true)
        const response = await fakeRequest()
        setIsSaving(false)

    }

    return [saveData, isSaving, isError, errorMessage]
}


export { useFetchBackend, useLoadData, useSaveData }
