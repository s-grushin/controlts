import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { formatAxiosError } from '../../utils/common'

export const savePayData = createAsyncThunk(
    'vehicleMovePayData/savePayData',
    async function (_, { fulfillWithValue, rejectWithValue, getState }) {
        try {
            const { vehicleMoveId } = getState().vehicleMovePayData
            const response = await axios.post('/vehicleMoves/savePayData', { vehicleMoveId })
            return fulfillWithValue({ payData: response.data })
        } catch (error) {
            const message = formatAxiosError(error)
            return rejectWithValue({ message })
        }
    }
)


const vehicleMovePayDataSlice = createSlice({
    name: 'vehicleMovePayData',
    initialState: {
        payData: null,
        status: 'idle', //'idle' || 'loading' || 'error'
        error: null,
        vehicleMoveId: null, // id движения к которому относится оплата
    },
    reducers: {
        setPayData(state, action) {
            const { payData, vehicleMoveId } = action.payload
            state.vehicleMoveId = vehicleMoveId
            state.payData = payData
        },
        clearError(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(savePayData.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })

        builder.addCase(savePayData.fulfilled, (state, action) => {
            state.status = 'idle'
            const { payData } = action.payload
            state.payData = payData
        })

        builder.addCase(savePayData.rejected, (state, action) => {
            const { message } = action.payload
            state.status = 'error'
            state.error = message
        })
    }
})

export const { setPayData, clearError } = vehicleMovePayDataSlice.actions
export default vehicleMovePayDataSlice.reducer
