import { useEffect, useReducer, createContext, useCallback } from "react"
import reducer from '../components/VehicleDetails/reducer'
import useHttp from "../hooks/useHttp"


const ititState = {
    emptyRow: { id: '', vehicleTypeId: '', number: '', photoUrl: '' },
    selectedRowId: null,
    vehicleTypes: [],
    rows: []
}

export const VehicleDetailsContext = createContext()

export const VehicleDetailsProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, ititState)
    const { request } = useHttp()

    const fetchVehicleTypes = useCallback(async () => {
        const { rows } = await request('/vehicleTypes')
        dispatch({ type: 'fillVehicleTypes', payload: rows })
        dispatch({ type: 'setRowsByDefault' })
    }, [request])

    useEffect(() => {

        fetchVehicleTypes()

    }, [fetchVehicleTypes])


    return (
        <VehicleDetailsContext.Provider value={{ state, dispatch }}>
            {children}
        </VehicleDetailsContext.Provider>
    )
}


export default VehicleDetailsProvider


