import AppToolbar from 'components/AppTable/Toolbar'
import { useMoveServicesApi, useMoveServicesState } from '../MoveServicesProvider'
import CalculateServices from './CalculateServices'

const Toolbar = () => {

    const { dispatch, saveItems } = useMoveServicesApi()
    const { state, readonly } = useMoveServicesState()

    const add = () => {
        dispatch({ type: 'addNewItem' })
    }

    const deleteOne = () => {
        dispatch({ type: 'deleteItem', payload: { id: state.selectedId } })
        dispatch({ type: 'setSelectedId', payload: { id: null } })
    }

    const save = () => {
        saveItems()
    }


    const disabledBtn = {
        addDisabled: state.loading,
        deleteOneDisabled: !state.selectedId || state.loading,
        saveDisabled: !state.isModified || state.loading,
    }

    if (readonly) {
        return null
    }

    const handleParkingDaysSuccess = (services) => {
        services?.parking && dispatch({ type: 'addItem', payload: { calculatedItem: services.parking } })
    }

    const handleParkingDaysError = (error) => {
        dispatch({ type: 'setError', payload: { message: error } })
    }

    return (
        <div>
            <AppToolbar
                handlers={{ add, deleteOne, save }}
                disabledBtn={disabledBtn}
                renderExtraButtons={() =>
                    <CalculateServices
                        moveId={state.vehicleMoveId}
                        onSuccess={handleParkingDaysSuccess}
                        onError={handleParkingDaysError} />}
            />
        </div>
    )
}

export default Toolbar