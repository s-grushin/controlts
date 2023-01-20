import { createContext, useReducer } from 'react'
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
        dateIn: { from: '', to: '' }
    }
}

const reducer = (state, action) => {

    switch (action.type) {

        case 'clearItems':
            return { ...state, items: [] }

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
            return { ...state, dateInRange: { ...state.dateInRange, from: action.payload.from, to: action.payload.to } }

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

export let vehicleMoveActions = null

const VehicleMovesProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initState)

    vehicleMoveActions = {

        fetchItems: async (filterOptions) => {

            let url = '/vehicleMoves'

            if (filterOptions) {

                switch (filterOptions.type) {
                    case 'onTerritory':
                        url = url.concat('?onTerritory=1')
                        break;
                    case 'last2days':
                        url = url.concat('?last2days=1')
                        break;
                    case 'last7days':
                        url = url.concat('?last7days=1')
                        break;
                    case 'last30days':
                        url = url.concat('?last30days=1')
                        break;
                    case 'thisYear':
                        url = url.concat('?thisYear=1')
                        break;
                    case 'dateInRange':
                        dispatch({ type: 'setDateInRangeFilter', payload: { from: filterOptions.value.from, to: filterOptions.value.to } })
                        url = url.concat(`?dateInFrom=${filterOptions.value.dateFrom}&dateInTo=${filterOptions.value.dateTo}`)
                        break;
                    default:
                        break;
                }
            }

            try {
                dispatch({ type: 'fetchItemsPending' })
                const response = await axios.get(url)
                dispatch({ type: 'fetchItemsSuccess', payload: response.data.rows })
                dispatch({ type: 'setSelectedItem', payload: response.data.rows.length > 0 ? response.data.rows[0].id : null })
            } catch (error) {
                dispatch({ type: 'fetchItemsFailed' })
            }
        },

        fetchItems2: async () => {

            //let url = '/vehicleMoves'

            //let queryParams = state.filters.map(item => `${item.name}=${item.value}`).join('&')
            //console.log(queryParams);

            // try {
            //     dispatch({ type: 'fetchItemsPending' })
            //     const response = await axios.get(url)
            //     dispatch({ type: 'fetchItemsSuccess', payload: response.data.rows })
            //     dispatch({ type: 'setSelectedItem', payload: response.data.rows.length > 0 ? response.data.rows[0].id : null })
            // } catch (error) {
            //     dispatch({ type: 'fetchItemsFailed' })
            // }
        },
        setVehicleFilterTitle: (title) => {
            dispatch({ type: 'setVehicleFilterTitle', payload: title })
        }
    }

    return (
        <VehicleMovesContext.Provider value={{ state, dispatch }}>
            {children}
        </VehicleMovesContext.Provider>
    )
}



export default VehicleMovesProvider