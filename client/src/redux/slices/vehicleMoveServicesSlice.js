import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { formatAxiosError } from '../../utils/common'

function getEmptyService() {
    return {
        id: nanoid(),
        vehicleMoveId: null,
        serviceId: null,
        quantity: 1,
        price: 0,
        summ: 0
    }
}

function prepareServicesForSaving(services, vehicleMoveId) {
    return services.map(item => {
        return { ...item, vehicleMoveId, id: null }
    })
}

export const saveServices = createAsyncThunk(
    'vehicleMoveServices/saveServices',
    async function (_, { fulfillWithValue, rejectWithValue, getState }) {
        try {
            const { vehicleMoveId, items } = getState().vehicleMoveServices
            const res = await axios.post('/vehicleMoves/saveServices', { vehicleMoveId, services: prepareServicesForSaving(items, vehicleMoveId) })
            const { services } = res.data
            return fulfillWithValue({ services })
        } catch (error) {
            const message = formatAxiosError(error)
            return rejectWithValue({ message })
        }
    }
)


const vehicleMoveServicesSlice = createSlice({
    name: 'vehicleMoveServices',
    initialState: {
        items: [],
        selectedId: null,
        status: 'idle', //'idle' || 'filled' || 'loading' || 'error'
        error: null,
        vehicleMoveId: null, // id движения к которому относятся услуги
        isModified: false
    },
    reducers: {
        setServices(state, action) {
            const { items, vehicleMoveId } = action.payload
            state.items = items
            state.vehicleMoveId = vehicleMoveId
            state.status = 'filled'
            state.isModified = false
        },
        addNewService(state) {
            state.items.push(getEmptyService(state.vehicleMoveId))
            state.isModified = true
        },
        deleteService(state, action) {
            const { id } = action.payload
            state.items = state.items.filter(item => item.id !== id)
            state.isModified = true
        },
        setSelectedId(state, action) {
            const { id } = action.payload
            state.selectedId = id
        },
        editService(state, action) {
            const { id, key, value } = action.payload
            let service = getServiceById(state, id)
            service[key] = value
            if (service.quantity < 0 || !Number(service.quantity)) {
                service.quantity = 0
            }
            state.isModified = true
            service.summ = service.quantity * service.price
        },
        clearError(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveServices.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })

        builder.addCase(saveServices.fulfilled, (state, action) => {
            const { services } = action.payload
            state.status = 'idle'
            state.isModified = false
            state.items = services
        })

        builder.addCase(saveServices.rejected, (state, action) => {
            const { message } = action.payload
            state.status = 'error'
            state.error = message
        })
    }
})

//helpers
export const getServiceById = (vehicleMoveServices, id) => vehicleMoveServices.items.find(item => item.id === id)
export const getSelectedItem = (vehicleMoveServices) => vehicleMoveServices.items.find(item => item.id === vehicleMoveServices.selectedId)


export const { setServices, addNewService, deleteService, editService, setSelectedId, clearError } = vehicleMoveServicesSlice.actions
export default vehicleMoveServicesSlice.reducer
