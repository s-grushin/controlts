import { useEffect, useReducer, createContext, useContext } from 'react'
import axios from 'utils/axios'
import uuid from 'react-uuid';
import { STORAGE_KEYS } from 'constants/appConstants'

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
    return {
        id: uuid(),
        number: '',
        photo: '',
        vehicleTypeId: null
    }
}

const convertVehicleTypesToItems = (vehicleTypes) => {
    return vehicleTypes.map(vt => {
        const newItem = getNewItem()
        return { ...newItem, vehicleTypeId: vt.id }
    })
}

const fillCameraData = (vehicleTypes, cameraData, dispatch) => {

    let items = convertVehicleTypesToItems(vehicleTypes)
    cameraData.forEach(camera => {

        if (camera.cameraName === 'front') {
            let vehicleTypeId = vehicleTypes.find(item => item.progName === 'truck')?.id
            items = items.map(item => {
                if (item.vehicleTypeId === vehicleTypeId) {
                    return { ...item, number: camera.number, photo: camera.publicPhotoPath }
                } else {
                    return { ...item }
                }
            })
        }

        if (camera.cameraName === 'back') {
            let vehicleTypeId = vehicleTypes.find(item => item.progName === 'trailer')?.id
            items = items.map(item => {
                if (item.vehicleTypeId === vehicleTypeId) {
                    return { ...item, number: camera.number, photo: camera.publicPhotoPath }
                } else {
                    return { ...item }
                }
            })
        }

    })

    dispatch({ type: 'init', payload: { items } })

}

const VehicleTypeDetailsProvider = ({ children, vehicleTypeDetails, cameraData, isNew, readonly }) => {

    //isNew для заполнения пустыми значениями

    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {

        const init = async () => {

            let vehicleTypes = state.vehicleTypes

            if (!state.vehicleTypesInitialized) {
                const res = await axios.get('/vehicleTypes')
                vehicleTypes = res.data.rows
                dispatch({ type: 'setVehicleTypes', payload: { vehicleTypes } })
            }

            if (isNew && vehicleTypeDetails.length === 0) {
                dispatch({ type: 'init', payload: { items: convertVehicleTypesToItems(vehicleTypes) } })
            }

            if (vehicleTypeDetails.length > 0) {
                dispatch({ type: 'init', payload: { items: vehicleTypeDetails } })
            }

            if (cameraData.length > 0) {
                fillCameraData(state.vehicleTypes, cameraData, dispatch)
            }

        }

        init()

    }, [state.vehicleTypesInitialized, state.vehicleTypes, isNew, vehicleTypeDetails, cameraData])

    useEffect(() => {

        if (isNew) {
            // Не знаю как лучше сделать. Как из родительского компонента получить state.items более правильно?
            localStorage.setItem(STORAGE_KEYS.newVehicleDetails, JSON.stringify(state.items))
        }

    }, [state.items, isNew])



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
            const { items } = action.payload
            return {
                ...state,
                status: 'idle',
                items,
                selectedId: items.length > 0 && items[0].id
            }
        case 'setVehicleTypes':
            const { vehicleTypes } = action.payload
            return {
                ...state,
                vehicleTypes,
                vehicleTypesInitialized: true
            }
        case 'error':
            return {
                ...state,
                error: action.payload.message,
                status: 'idle',
            }
        case 'setSelectedId':
            return { ...state, selectedId: action.payload.id }
        case 'add':
            return {
                ...state,
                items: [...state.items, getNewItem()],
            }
        case 'delete':
            return {
                ...state,
                items: state.items.filter(item => item.id !== state.selectedId),
                //selectedId: state.items[0].id
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
    items: [],
    selectedId: null,
    status: 'loading', // 'idle' || 'loading'
    error: null,
    vehicleTypes: [],
    vehicleTypesInitialized: false
}

VehicleTypeDetailsProvider.defaultProps = {
    readonly: false,
    isNew: false,
    vehicleTypeDetails: [],
    cameraData: [],
}


export default VehicleTypeDetailsProvider