import { useReducer, createContext } from "react";
import uuid from "react-uuid";

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
    servicesModified: false
}


const AccountantContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <AccountantContext.Provider value={{ state, dispatch }}>
            {children}
        </AccountantContext.Provider>
    )
}

export default AccountantContextProvider