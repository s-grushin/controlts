import { useEffect, useReducer, createContext, useContext } from 'react'
import { STORAGE_KEYS } from 'constants/appConstants'
import { useLazyGetMoveRegistrationPhotoSettingsQuery } from 'redux/api/moveRegistrationPhotoSettingsApi';
import { useLazyGetVehicleTypesQuery } from 'redux/api/vehicleTypesApi'
import DetailItem from './types/DetailItem';

const StateContext = createContext(null);
const ApiContext = createContext(null);

export const useVehicleTypeDetailsState = () => {
    const context = useContext(StateContext)
    if (!context) {
        throw new Error('useVehicleTypeDetailsState must be used within the VehicleTypeDetailsProvider')
    }
    return context
}

export const useVehicleTypeDetailsApi = () => {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error('useVehicleTypeDetailsApi must be used within the VehicleTypeDetailsProvider')
    }
    return context
}


const getNewItem = () => {
    return new DetailItem()
}

const mapRegSettingsToMoveDetails = (regSettings) => {

    const mapped = regSettings.map(item => {
        const di = new DetailItem()
        di.vehicleTypeId = item.vehicleTypeId
        return di
    })

    return mapped
}

const VehicleTypeDetailsProvider = ({ children, moveDetails, readonly, loading }) => {

    //moveDetails - [] - массив содержащий данные таблицы vehicle_move_details  

    const [getMoveRegSettings] = useLazyGetMoveRegistrationPhotoSettingsQuery()
    const [getVehicleTypes] = useLazyGetVehicleTypesQuery()

    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {

        const init = async () => {

            if (loading) {
                dispatch({ type: 'setStatus', payload: { status: 'loading' } })
                return
            } else {
                dispatch({ type: 'setStatus', payload: { status: 'idle' } })
            }

            try {
                // получим типы автотранспорта, для того что бы можно было выбирать из списка   
                const vt = await getVehicleTypes(undefined, true).unwrap()
                dispatch({ type: 'setVehicleTypes', payload: { vehicleTypes: vt.rows } })

                if (moveDetails.length > 0) {
                    // просто отображаем moveDetails
                    dispatch({ type: 'init', payload: { items: moveDetails, moveId: moveDetails[0].vehicleMoveId } })
                } else {
                    //это новая форма, и нужно сформировать пустой шаблон новой формы на основании moveRegistrationPhotoSettings
                    const moveRegSettings = await getMoveRegSettings().unwrap()
                    dispatch({ type: 'init', payload: { items: mapRegSettingsToMoveDetails(moveRegSettings.rows), moveId: null } })
                }

            } catch (error) {
                dispatch({ type: 'error', payload: { message: `ошибка инициализации: ${JSON.stringify(error)}` } })
            }

        }

        init()

    }, [moveDetails, getMoveRegSettings, getVehicleTypes, readonly, loading])

    useEffect(() => {

        // Не знаю как лучше сделать. Как из родительского компонента получить state.items более правильно?
        localStorage.setItem(STORAGE_KEYS.newVehicleDetails, JSON.stringify(state.items))

    }, [state.items])



    const stateValue = {
        state,
        readonly
    }



    return (
        <StateContext.Provider value={stateValue}>
            <ApiContext.Provider value={dispatch}>
                {children}
            </ApiContext.Provider>
        </StateContext.Provider>
    )
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'init':
            const { items, moveId } = action.payload
            return {
                ...state,
                status: 'idle',
                items,
                moveId,
                selectedId: items.length > 0 && items[0].id
            }
        case 'setVehicleTypes':
            const { vehicleTypes } = action.payload
            return {
                ...state,
                vehicleTypes,
            }
        case 'error':
            return {
                ...state,
                error: action.payload.message,
                status: 'idle',
            }
        case 'setSelectedId':
            return { ...state, selectedId: action.payload.id }
        case 'setStatus':
            return { ...state, status: action.payload.status }
        case 'add':
            return {
                ...state,
                items: [...state.items, getNewItem()],
            }
        case 'delete':
            return {
                ...state,
                items: state.items.filter(item => item.id !== state.selectedId),
            }
        case 'edit':
            const { id, name, value } = action.payload
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === id) {
                        return { ...item, [name]: value }
                    } else {
                        return { ...item }
                    }
                })
            }

        default:
            return { ...state }
    }
}

const initState = {
    items: [],  //массив объектов типа DetailItem
    moveId: null, //id move к которому относятся move details
    selectedId: null,
    status: 'loading', // 'idle' || 'loading'
    error: null,
    vehicleTypes: [],
}

VehicleTypeDetailsProvider.defaultProps = {
    readonly: false,
    moveDetails: [],
}


export default VehicleTypeDetailsProvider