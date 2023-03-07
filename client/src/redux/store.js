import { configureStore } from '@reduxjs/toolkit'
import movesApi from './api/movesApi'
import movesInfoReducer from './slices/movesInfoSlice'

const store = configureStore({
    reducer: {
        [movesApi.reducerPath]: movesApi.reducer,
        movesInfo: movesInfoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([movesApi.middleware]),
})

export default store