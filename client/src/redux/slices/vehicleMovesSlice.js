import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { formatAxiosError } from '../../utils/common'

const BASE_URL = '/vehicleMoves'

function getSearchParams(filters) {

    const vehicleActiveFilter = getActiveFilter(filters, 'vehicles')
    if (vehicleActiveFilter.apiName === 'All') {
        return ''
    }

    const params = new URLSearchParams()
    params.append(vehicleActiveFilter.apiName, vehicleActiveFilter.value)

    return '?' + params.toString()
}

export const fetchVehicleMoves = createAsyncThunk(
    'vehicleMoves/fetchVehicleMoves',
    async function (_, { getState, rejectWithValue }) {

        const filters = getState().vehicleMoves.filters
        const url = BASE_URL + getSearchParams(filters)

        try {
            const items = await axios.get(url)
            return items.data.rows
        } catch (error) {
            const message = formatAxiosError(error)
            return rejectWithValue(message)
        }
    }
)

const vehicleMovesSlice = createSlice({
    name: 'vehicleMoves',
    initialState: {
        items: [],
        selectedId: null,
        status: 'idle', //'idle' || 'loading' || 'succeeded' || 'failed'
        error: null,
        filters: {
            vehicles: [
                { active: true, apiName: 'All', name: 'All', title: 'Всё', value: true },
                { active: false, apiName: 'today', name: 'today', title: 'За сегодня', value: true },
                { active: false, apiName: 'lastDays', name: 'last2Days', title: 'За последние 2 дня', value: 2 },
                { active: false, apiName: 'lastDays', name: 'last7Days', title: 'За последнюю неделю', value: 7 },
                { active: false, apiName: 'lastDays', name: 'last31Days', title: 'За последний месяц', value: 31 },
                { active: false, apiName: 'thisYear', name: 'thisYear', title: 'За этот год', value: true },
                { active: false, apiName: 'pickedDateIn', name: 'pickedDateIn', title: 'За выбранный период', value: { from: null, to: null } },
                { active: false, apiName: 'onTerritory', name: 'onTerritory', title: 'На территории', value: true },
            ]

        }
    },
    reducers: {
        setSelectedId(state, action) {
            state.selectedId = action.payload.id
        },
        setFilter(state, action) {

            const { filterType, filterName, value } = action.payload
            state.filters[filterType] = state.filters[filterType].map(item => {
                if (item.name === filterName) {
                    item.active = true
                } else {
                    item.active = false
                }

                if (filterName === 'pickedDateIn') item.value = value

                return item
            })
        },
        refreshPayData(state, action) {
            const { payData } = action.payload
            state.items.find(item => item.id === state.selectedId).payData = payData
        },
        refreshOutgo(state, action) {
            const { data } = action.payload
            state.items.find(item => item.id === state.selectedId).outgo = data
        },
        refreshServices(state, action) {
            const { services } = action.payload
            state.items.find(item => item.id === state.selectedId).services = services
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchVehicleMoves.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })

        builder.addCase(fetchVehicleMoves.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload
        })

        builder.addCase(fetchVehicleMoves.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }
})

export const getActiveFilter = (filters, filterType) => filters[filterType].find(item => item.active === true)
export const getVehicleMoveById = (vehicleMoves, id) => vehicleMoves.items.find(item => item.id === id)
export const getSelectedItem = (vehicleMoves) => vehicleMoves.items.find(item => item.id === vehicleMoves.selectedId)

export const { setSelectedId, setFilter, refreshServices, refreshPayData, refreshOutgo } = vehicleMovesSlice.actions
export default vehicleMovesSlice.reducer