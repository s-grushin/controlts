import AppToolbar from '../../../../AppTable/Toolbar'
import useAccountantContext from '../../hooks/useAccountantContext'

const Toolbar = () => {

    const { contextValue } = useAccountantContext()
    const { dispatch, state } = contextValue

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

        console.log('save');
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