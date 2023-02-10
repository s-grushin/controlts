import { useEffect, useReducer, createContext, useCallback } from "react"
import useHttp from "../../../../hooks/useHttp"
import uuid from "react-uuid"


const ititState = {
    emptyRow: { id: '', vehicleTypeId: '', number: '', photoUrl: '' },
    selectedRowId: null,
    vehicleTypes: [],
    rows: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'addRow':
            return {
                ...state,
                rows: [...state.rows, { ...state.emptyRow, id: uuid() }],
                selectedRowId: null
            }
        case 'deleteRow':
            return {
                ...state,
                rows: state.rows.filter(row => row.id !== action.payload),
                selectedRowId: null
            }
        case 'selectRow':
            return {
                ...state,
                selectedRowId: action.payload
            }
        case 'editRow':
            return {
                ...state,
                rows: state.rows.map(row => {
                    if (row.id !== action.payload.id) return row
                    return { ...row, [action.payload.name]: action.payload.value }
                })
            }
        case 'fillVehicleTypes':
            return {
                ...state,
                vehicleTypes: action.payload
            }

        case 'fillCameraData':
            return {
                ...state,
                rows: state.rows.map((row, index) => {
                    //cd - cameraData element. 
                    const cd = action.payload[index]
                    return { ...row, number: cd.number, photoUrl: cd.publicPhotoPath }
                })
            }

        case 'setRowsByDefault':
            //формируем строки на основании таблицы vehicleTypes
            //1. Убираем те строки где orderInCheckout = false
            //2. Сортируем по возрастанию
            //3. Преобразуем в шаблон emptyRow   
            const rows = state.vehicleTypes.filter(item => item.orderInCheckout)
                .sort((a, b) => a.orderInCheckout - b.orderInCheckout)
                .map(item => {
                    return {
                        ...state.emptyRow,
                        id: uuid(),
                        vehicleTypeId: item.id
                    }
                })

            return {
                ...state,
                rows
            }
        default:
            return { ...state }
    }
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


