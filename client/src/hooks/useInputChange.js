function useInputChange(state, setState) {

    const inputChange = (event) => {

        console.log(event);
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