import { useState, useEffect } from "react";

function useApiFetch(apiFunc) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServer = () => {
        // function for testing loading
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(apiFunc())
            }, 3000);
        })
    }

    async function apiFetch() {
        const json = await apiFunc()
        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        apiFetch();
    }, []);

    return [data, loading];
}

export { useApiFetch };