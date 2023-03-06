import { useState, useEffect } from 'react'

const useLocalStorage = (key) => {

    const [value, setValue] = useState(null)

    useEffect(() => {
        setValue(JSON.parse(localStorage.getItem(key)))
    }, [key])

    const saveValue = (value) => {
        localStorage.setItem(key, JSON.stringify(value))
        setValue(value)
    }

    return [value, saveValue]

}

export default useLocalStorage