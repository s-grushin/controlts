import { createContext, useReducer, useCallback } from 'react'
import axios from '../utils/axios'

export const VehicleMovesContext = createContext()

export const availableFilters = {
    all: { name: 'all' },
    onTerritory: { name: 'onTerritory' },
    lastDays: { name: 'lastDays' },
    thisYear: { name: 'thisYear' },
    dateInRange: { name: 'dateInRange' },
}

export const initState = {
    items: [],
    selectedId: null,
    loading: false,
    error: null,
    vehicleFilterTitle: 'Все',
    filters: {
        vehicles: null,
        dateIn: { from: '', to: '', tzOffset: '' }
    }
}

const baseUrl = '/vehicleMoves'

const reducer = (state, action) => {

    switch (action.type) {

        case 'clearError':
            return { ...state, error: null }

        case 'fetchItemsPending':
            return { ...state, loading: true }

        case 'fetchItemsSuccess':
            return { ...state, loading: false, items: action.payload }

        case 'fetchItemsError':
            return { ...state, loading: false, error: action.payload }

        case 'setSelectedItem':
            return { ...state, selectedId: action.payload }

        case 'setVehicleFilterTitle':
            return { ...state, vehicleFilterTitle: action.payload }

        case 'setDateInRangeFilter':
            return {
                ...state, dateInRange: { ...state.dateInRange, filters: { dateIn: action.payload } }
            }

        case 'clearFilters':
            return { ...state, filters: [] }

        case 'setVehicleFilter':
            return { ...state, filters: { ...state.filters, vehicles: action.payload } }

        case 'setDateInFilter':
            return { ...state, filters: { ...state.filters, dateIn: action.payload } }

        default:
            return { ...state }
    }
}

const VehicleMovesProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initState)

    const fetchItems = useCallback(async () => {

        const searchParams = new URLSearchParams()
        state.filters.vehicles && searchParams.append(state.filters.vehicles.name, state.filters.vehicles.value)
        if (state.filters.dateIn.from || state.filters.dateIn.to) {
            searchParams.append('dateInRange', `${state.filters.dateIn.from}to${state.filters.dateIn.to}`)
            searchParams.append('tzOffset', state.filters.dateIn.tzOffset)
        }

        const fetchUrl = baseUrl + (searchParams.toString() ? '?' + searchParams.toString() : '')

        try {
            dispatch({ type: 'clearError' })
            dispatch({ type: 'fetchItemsPending' })
            const response = await axios.get(fetchUrl)
            dispatch({ type: 'fetchItemsSuccess', payload: response.data.rows })
            dispatch({ type: 'setSelectedItem', payload: response.data.rows.length > 0 ? response.data.rows[0].id : null })
        } catch (error) {
            const errorMsg = `${error.message} ${error.response?.data?.message}`
            dispatch({ type: 'fetchItemsError', payload: errorMsg })
        }

    }, [state.filters])

    return (
        <VehicleMovesContext.Provider value={{ state, dispatch, fetchItems }}>
            {children}
        </VehicleMovesContext.Provider>
    )
}

export default VehicleMovesProvider