import { configureStore } from '@reduxjs/toolkit'
import movesInfoReducer from './slices/movesInfoSlice'
import movesApi from './api/movesApi'
import vehicleTypesApi from './api/vehicleTypesApi'
import camerasApi from './api/camerasApi'

const store = configureStore({
    reducer: {
        movesInfo: movesInfoReducer,
        [movesApi.reducerPath]: movesApi.reducer,
        [vehicleTypesApi.reducerPath]: vehicleTypesApi.reducer,
        [camerasApi.reducerPath]: camerasApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        movesApi.middleware,
        vehicleTypesApi.middleware,
        camerasApi.middleware,
    ]),
})

export default store