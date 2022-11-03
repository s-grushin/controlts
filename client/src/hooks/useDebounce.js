
const useDebounce = (ms = 1000) => {

    let timeout

    return (fn) => {
        clearTimeout(timeout)
        timeout = setTimeout(fn, ms)
    }

}

export default useDebounce