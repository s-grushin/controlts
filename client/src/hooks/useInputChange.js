
const useInputChange = () => {

    const inputChangeHandler = (event, setState) => {
        if (event.target.type === 'checkbox') {
            setState(event.target.checked)
        } else {
            setState(event.target.value)
        }
    }

    return inputChangeHandler

}

export default useInputChange