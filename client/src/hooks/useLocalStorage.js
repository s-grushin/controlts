import { useState, useEffect } from 'react'

const useLocalStorage = (key, defaultValue) => {

    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        const storedValue = JSON.parse(localStorage.getItem(key))
        if (storedValue) {
            setValue(storedValue)
        } else {
            setValue(defaultValue)
        }
    }, [key, defaultValue])

    const saveValue = (value) => {
        localStorage.setItem(key, JSON.stringify(value))
        setValue(value)
    }

    return [value, saveValue]

}

export default useLocalStorage