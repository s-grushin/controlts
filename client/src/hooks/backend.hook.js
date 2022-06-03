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

    /* function promisify(){
        return new Promise((resolve)=>{
            setTimeout(() => {
                resolve(fetchBackend())   
            }, 2000);
        })
    } */

    useEffect(() => {
        fetchBackend()

    }, [])



    return [isLoading, data, isError, errorMessage]
}

function useTest() {

    useEffect(() => {

        console.log('useTest');

    }, [])


}

export { useFetchBackend, useLoadData, useTest }
