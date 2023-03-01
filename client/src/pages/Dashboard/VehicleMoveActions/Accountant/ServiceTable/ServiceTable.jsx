import Toolbar from './Toolbar'
import Table from './Table'
import AppAlert from '../../../../../components/AppAlert'
import { useSelector, useDispatch } from 'react-redux'
import { clearError } from '../../../../../redux/slices/vehicleMoveServicesSlice'

const ServiceTable = () => {

    const services = useSelector(state => state.vehicleMoveServices)
    const dispatch = useDispatch()

    return (
        <>
            <AppAlert show={services.error} text={services.error} clear={() => dispatch(clearError())} />
            <Toolbar />
            <Table />
        </>
    )
}

export default ServiceTable