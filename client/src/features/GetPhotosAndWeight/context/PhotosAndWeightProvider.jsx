import { useEffect, useReducer, createContext } from "react"

export const PhotosAndWeightContext = createContext()

const initState = {
    weight: 0,
    items: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'setWeight':
            return { ...state, weight: action.payload }
        case 'setItems':
            return { ...state, items: action.payload }
        default:
            return { ...state }
    }
}


const PhotosAndWeightProvider = ({ children, vehicleMove }) => {

    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        dispatch({ type: 'setItems', payload: vehicleMove?.vehicleDetails || [] })
    }, [vehicleMove])


    return (
        <PhotosAndWeightContext.Provider value={{ state, dispatch }}>
            {children}
        </PhotosAndWeightContext.Provider>
    )
}

export default PhotosAndWeightProvider