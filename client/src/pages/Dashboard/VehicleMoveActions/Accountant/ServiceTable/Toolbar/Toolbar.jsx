import AppToolbar from '../../../../../../components/AppTable/Toolbar'
import { useSelector, useDispatch } from 'react-redux'
import { addNewService, deleteService, setSelectedId, saveServices } from '../../../../../../redux/slices/vehicleMoveServicesSlice'

const Toolbar = () => {

    const services = useSelector(state => state.vehicleMoveServices)
    const dispatch = useDispatch()

    const add = () => {
        dispatch(addNewService())
    }

    const deleteOne = () => {
        dispatch(deleteService({ id: services.selectedId }))
        dispatch(setSelectedId({ id: null }))
    }

    const save = () => {
        dispatch(saveServices())
    }

    const disabledBtn = {
        deleteOneDisabled: !services.selectedId,
        saveDisabled: !services.isModified,
    }

    return (
        <div>
            <AppToolbar handlers={{ add, deleteOne, save }} disabledBtn={disabledBtn} />
        </div>
    )
}

export default Toolbar