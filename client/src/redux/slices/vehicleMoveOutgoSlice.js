import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { formatAxiosError } from '../../utils/common'

export const saveOutgo = createAsyncThunk(
    'vehicleMoveOutgo/saveOutgo',
    async function (args, { fulfillWithValue, rejectWithValue, getState }) {
        try {
            const vehicleMoveId = getState().vehicleMoves.selectedId
            const data = getState().vehicleMoveOutgo.data
            const response = await axios.post('/vehicleMoves/saveOutgo', { vehicleMoveId, data, ...args })
            return fulfillWithValue({ data: response.data })
        } catch (error) {
            const message = formatAxiosError(error)
            return rejectWithValue({ message })
        }
    }
)


const vehicleMoveOutgoSlice = createSlice({
    name: 'vehicleMoveOutgo',
    initialState: {
        data: null,
        status: 'idle', //'idle' || 'loading' || 'error'
        error: null,
        vehicleMoveId: null, // id движения к которому относится оплата
    },
    reducers: {
        setOutgo(state, action) {
            const { data, vehicleMoveId } = action.payload
            state.vehicleMoveId = vehicleMoveId
            state.data = data
        },
        clearError(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveOutgo.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })

        builder.addCase(saveOutgo.fulfilled, (state, action) => {
            state.status = 'idle'
            const { data } = action.payload
            state.data = data
        })

        builder.addCase(saveOutgo.rejected, (state, action) => {
            const { message } = action.payload
            state.status = 'error'
            state.error = message
        })
    }
})

export const { setOutgo, clearError } = vehicleMoveOutgoSlice.actions
export default vehicleMoveOutgoSlice.reducer
