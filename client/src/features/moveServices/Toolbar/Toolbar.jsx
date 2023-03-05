import AppToolbar from 'components/AppTable/Toolbar'
import { useMoveServicesApi, useMoveServicesState } from '../MoveServicesProvider'

const Toolbar = () => {

    const { dispatch, saveItems } = useMoveServicesApi()
    const { state, readonly } = useMoveServicesState()

    const add = () => {
        dispatch({ type: 'addItem' })
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

    return (
        <div>
            <AppToolbar handlers={{ add, deleteOne, save }} disabledBtn={disabledBtn} />
        </div>
    )
}

export default Toolbar