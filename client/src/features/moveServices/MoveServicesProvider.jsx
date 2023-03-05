import { useEffect, useReducer, createContext, useContext } from 'react'
import axios from 'utils/axios'
import uuid from 'react-uuid'
import Table from './Table'
import Toolbar from './Toolbar'
import { formatAxiosError } from 'utils/common'
import AppAlert from 'components/AppAlert'
import { useSaveServicesMutation } from 'redux/api/movesApi'

export const StateContext = createContext()
export const ApiContext = createContext()

export const useMoveServicesState = () => {
    const context = useContext(StateContext)
    if (!context) {
        throw new Error('useVehicleTypeDetailsState must be used within the MoveServicesProvider')
    }
    return context
}

export const useMoveServicesApi = () => {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error('useVehicleTypeDetailsApi must be used within the MoveServicesProvider')
    }
    return context
}


function getNewItem() {
    return {
        id: uuid(),
        vehicleMoveId: null,
        serviceId: null,
        quantity: 1,
        price: 0,
        summ: 0
    }
}

function prepareServicesForSaving(services, vehicleMoveId) {
    return services.map(item => ({
        ...item, id: null, vehicleMoveId
    }))
}

const initialState = {
    items: [],
    selectedId: null,
    loading: false,
    error: null,
    vehicleMoveId: null, // id движения к которому относятся услуги
    isModified: false,
    allServices: [],
}

const MoveServicesProvider = ({ move, readonly }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [saveServices] = useSaveServicesMutation()

    useEffect(() => {
        dispatch({ type: 'init', payload: { items: move.services, vehicleMoveId: move.id } })
    }, [move])

    useEffect(() => {

        const fetchAllServices = async () => {
            dispatch({ type: 'setLoading', payload: { loading: true } })
            try {
                const response = await axios.get('/services')
                dispatch({ type: 'setAllServices', payload: { allServices: response?.data?.rows } })
            } catch (error) {
                dispatch({ type: 'setError', payload: { message: formatAxiosError(error) } })
            } finally {
                dispatch({ type: 'setLoading', payload: { loading: false } })
            }
        }

        fetchAllServices()

    }, [])

    const saveItems = async () => {

        try {
            dispatch({ type: 'setLoading', payload: { loading: true } })
            await saveServices({
                services: prepareServicesForSaving(state.items, state.vehicleMoveId),
                vehicleMoveId: state.vehicleMoveId,
            }).unwrap()
        } catch (error) {
            console.log(error);
            dispatch({ type: 'setError', payload: { message: `Не удалось сохранить услуги: ${JSON.stringify(error)}` } })
        } finally {
            dispatch({ type: 'setLoading', payload: { loading: false } })
        }

    }


    return (
        <ApiContext.Provider value={{ dispatch, saveItems }}>
            <StateContext.Provider value={{ state, readonly }}>
                <AppAlert show={state.error} clear={() => dispatch({ type: 'clearError' })} title='ошибка' text={state.error} />
                <Toolbar />
                <Table />
            </StateContext.Provider>
        </ApiContext.Provider>
    )
}

const checkItem = (item) => {

    let quantity = item.quantity

    if (!Number(item.quantity) || item.quantity < 0) {
        quantity = 0
    }
    const summ = item.price * quantity

    return { ...item, quantity, summ }
}

const reducer = (state, action) => {

    switch (action.type) {

        case 'init':
            const { items, vehicleMoveId } = action.payload
            return { ...state, items: items || [], vehicleMoveId, isModified: false }
        case 'addItem':
            return { ...state, isModified: true, items: [...state.items, getNewItem()] }

        case 'editItem':
            const { itemId, key, value } = action.payload
            return {
                ...state,
                isModified: true,
                items: state.items.map(item => {
                    if (item.id === itemId) {
                        return checkItem({ ...item, [key]: value })
                    } else {
                        return { ...item }
                    }
                })
            }

        case 'deleteItem':
            return {
                ...state,
                isModified: true,
                items: state.items.filter(item => item.id !== action.payload.id)
            }

        case 'setAllServices':
            const { allServices } = action.payload
            return { ...state, allServices: allServices || [] }

        case 'setLoading':
            return { ...state, loading: action.payload.loading }

        case 'setSelectedId':
            return { ...state, selectedId: action.payload.id }

        case 'setError':
            return { ...state, error: action.payload.message }

        case 'clearError':
            return { ...state, error: null }

        default:
            return { ...state }
    }

}

MoveServicesProvider.defaultProps = {
    readonly: false
}

export default MoveServicesProvider