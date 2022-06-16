function useInputChange(state, setState) {

    function inputChange(event) {

        const updatedState = { ...state }
        if (event.target.type === 'checkbox') {
            updatedState[event.target.name] = event.target.checked
        } else {
            updatedState[event.target.name] = event.target.value
        }
        setState(updatedState)
    }

    return [inputChange]
}

export default useInputChange