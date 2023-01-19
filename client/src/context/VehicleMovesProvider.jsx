import { createContext, useReducer } from 'react'
import axios from '../utils/axios'

export const VehicleMovesContext = createContext()

export const initState = {
    items: [],
    selectedId: null,
    loading: true,
    error: null,
    vehicleFilterTitle: 'Все'
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