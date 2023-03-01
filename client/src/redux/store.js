import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import vehicleMovesReducer, { refreshServices, refreshPayData, refreshOutgo, getVehicleMoveById } from './slices/vehicleMovesSlice'
import vehicleMoveServicesReducer, { setServices } from './slices/vehicleMoveServicesSlice'
import vehicleMovePayDataReducer, { setPayData } from './slices/vehicleMovePayDataSlice'
import vehicleMoveOutgoSlice, { setOutgo } from './slices/vehicleMoveOutgoSlice'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    //Когда после изменения оплаты на сервере оплата, нужно также обновить оплату в vehicleMoveSlice 
    type: 'vehicleMovePayData/savePayData/fulfilled',
    effect: (action) => {
        const { payData } = action.payload
        store.dispatch(refreshPayData({ payData }))
    }
})

listenerMiddleware.startListening({
    //Когда после изменения данных о выезде на сервере, нужно также обновить данные о выезде в vehicleMoveSlice 
    type: 'vehicleMoveOutgo/saveOutgo/fulfilled',
    effect: (action) => {
        const { data } = action.payload
        store.dispatch(refreshOutgo({ data }))
    }
})

listenerMiddleware.startListening({
    //Когда после изменения данных о услугах на сервере, нужно также обновить данные о выезде в vehicleMoveSlice 
    type: 'vehicleMoveServices/saveServices/fulfilled',
    effect: (action) => {
        const { services } = action.payload
        store.dispatch(refreshServices({ services }))
    }
})


listenerMiddleware.startListening({
    //Когда изменяется текущий vehicleMove, нужно установить services, payData
    type: 'vehicleMoves/setSelectedId',
    effect: (action, listenerApi) => {
        //console.log({ action, listenerApi });
        //console.log({ originalState: listenerApi.getOriginalState(), state: listenerApi.getState() });
        const state = listenerApi.getState()
        const { id } = action.payload
        const vehicleMove = getVehicleMoveById(state.vehicleMoves, id)

        //set services
        store.dispatch(setServices({ items: vehicleMove.services, vehicleMoveId: id }))

        //set payData
        store.dispatch(setPayData({ payData: vehicleMove.payData, vehicleMoveId: id }))

        //set outgo
        store.dispatch(setOutgo({ data: vehicleMove.outgo, vehicleMoveId: id }))

    }
})


const store = configureStore({
    reducer: {
        vehicleMoves: vehicleMovesReducer,
        vehicleMoveServices: vehicleMoveServicesReducer,
        vehicleMovePayData: vehicleMovePayDataReducer,
        vehicleMoveOutgo: vehicleMoveOutgoSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})



export default store