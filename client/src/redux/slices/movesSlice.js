import { createSlice } from '@reduxjs/toolkit'

const movesInfo = createSlice({
    name: 'movesInfo',
    initialState: {
        selectedId: null,

    },
    reducers: {
        setSelectedId(state, action) {
            state.selectedId = action.payload.id
        },
    },
})

export const { setSelectedId } = movesInfo.actions
export default movesInfo.reducer