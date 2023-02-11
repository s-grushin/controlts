import AppToolbar from '../../../../../../components/AppTable/Toolbar'
import useAccountantContext from '../../hooks/useAccountantContext'
import useVehicleMovesContext from '../../../../VehicleMovesList/hooks/useVehicleMovesContext'

const Toolbar = () => {

    const { contextValue, saveServices } = useAccountantContext()
    const { dispatch, state } = contextValue

    const vmContext = useVehicleMovesContext()
    const vmDispatch = vmContext.contextValue.dispatch

    const add = () => {
        dispatch({ type: 'addService' })
        dispatch({ type: 'setServicesModified', payload: true })
    }

    const deleteOne = () => {
        dispatch({ type: 'deleteService', payload: state.selectedServiceId })
        dispatch({ type: 'setSelectedServiceId', payload: null })
        dispatch({ type: 'setServicesModified', payload: true })
    }

    const deleteAll = () => {
        dispatch({ type: 'deleteAllServices' })
        dispatch({ type: 'setSelectedServiceId', payload: null })
        dispatch({ type: 'setServicesModified', payload: true })
    }

    const save = () => {

        if (state.services.find(item => item.serviceId === '0')) {
            return dispatch({ type: 'setError', payload: 'Не заполнены услуги' })
        }

        saveServices(state, dispatch)
        const preparedServices = state.services.map(item => { return { ...item, service: { id: item.serviceId, name: item.serviceId } } })
        vmDispatch({ type: 'setServices', payload: preparedServices })
        dispatch({ type: 'setServicesModified', payload: false })
    }

    const disabledBtn = {
        deleteOneDisabled: !state.selectedServiceId,
        deleteAllDisabled: !state.services.length,
        saveDisabled: !state.servicesModified,
    }

    return (
        <div>
            <AppToolbar handlers={{ add, deleteOne, deleteAll, save }} disabledBtn={disabledBtn} />
        </div>
    )
}

export default Toolbar