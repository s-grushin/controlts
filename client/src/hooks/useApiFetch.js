import { useState, useEffect } from "react";

function useApiFetch(apiFunc) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchServer = () => {
        // function for testing loading
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(apiFunc())
            }, 3000);
        })
    }


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

    return [data, loading, error];
}

export { useApiFetch };