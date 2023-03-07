import { createSlice } from '@reduxjs/toolkit'


const movesInfo = createSlice({
    name: 'movesInfo',
    initialState: {
        selectedId: null,
        pagination: { currentPage: 1 },
    },
    reducers: {
        setSelectedId(state, action) {
            state.selectedId = action.payload.id
        },
        setPagination(state, action) {
            const { currentPage } = action.payload
            state.pagination.currentPage = currentPage
        },
    },
})


export const { setSelectedId, setPagination } = movesInfo.actions
export default movesInfo.reducer