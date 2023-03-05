import { useEffect, useReducer, createContext } from "react"
import uuid from "react-uuid"
import axios from '../../../../../utils/axios'

export const AccountantContext = createContext()


const reducer = (state, action) => {

    switch (action.type) {

        case 'addService':
            return { ...state, services: [...state.services, getEmptyServiceRow()] }

        case 'addServicesBulk':
            return { ...state, services: [...action.payload] }

        case 'deleteService':
            return { ...state, services: state.services.filter(item => item.id !== action.payload) }

        case 'deleteAllServices':
            return { ...state, services: [] }

        case 'editService':
            let updatedRow = { ...state.services.find(item => item.id === action.payload.rowId) }
            updatedRow = { ...updatedRow, [action.payload.key]: action.payload.value }
            updatedRow.summ = updatedRow.quantity * updatedRow.price
            return { ...state, services: state.services.map(item => item.id === action.payload.rowId ? updatedRow : item) }

        case 'setSelectedServiceId':
            return { ...state, selectedServiceId: action.payload }

        case 'setServicesModified':
            return { ...state, servicesModified: action.payload }

        case 'setIsLoading':
            return { ...state, isLoading: action.payload }

        case 'setVehicleMoveId':
            return { ...state, vehicleMoveId: action.payload }

        case 'setError':
            return { ...state, error: action.payload }

        default:
            return { ...state }
    }

}

export const getEmptyServiceRow = () => {
    return {
        id: uuid(),
        serviceId: 0,
        quantity: 1,
        price: 0,
        summ: 0
    }
}


const initState = {
    services: [],
    selectedServiceId: null,
    servicesModified: false,
    isLoading: false,
    error: null,
    vehicleMoveId: null
}


export const saveServices = async (state, dispatch) => {

    dispatch({ type: 'setIsLoading', payload: true })
    dispatch({ type: 'setError', payload: null })
    try {
        await axios('/vehicleMoves/saveServices', { method: 'patch', data: { vmId: state.vehicleMoveId, services: state.services } })
    } catch (error) {
        const errorMsg = `${error.message} ${error.response?.data?.message}`
        dispatch({ type: 'setError', payload: errorMsg })
    } finally {
        dispatch({ type: 'setIsLoading', payload: false })
    }

}


const AccountantContextProvider = ({ children, vehicleMoveId }) => {

    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        dispatch({ type: 'setVehicleMoveId', payload: vehicleMoveId })
    }, [vehicleMoveId])

    return (
        <AccountantContext.Provider value={{ state, dispatch }}>
            {children}
        </AccountantContext.Provider>
    )
}

export default AccountantContextProvider