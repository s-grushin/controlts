import { useEffect, useContext } from 'react'
import VehicleMovesList from '../../components/VehicleMovesList'
import VehicleMoveDetails from '../../components/VehicleMoveDetails'
import Spinner from '../../components/Spinner'
import AppAlert from '../../components/AppAlert'
import { Stack } from 'react-bootstrap'
import PrintPassButton from '../../printForms/Pass/PrintPassButton'
import VehicleMoveActions from '../../components/VehicleMoveActions/VehicleMoveActions'
import { VehicleMovesContext } from '../../context/VehicleMovesProvider'
import { vehicleMoveActions } from '../../context/VehicleMovesProvider'

const Dashboard = () => {

    const { state: vmState } = useContext(VehicleMovesContext)

    useEffect(() => {

        vehicleMoveActions.fetchItems()

    }, [])

    if (vmState.loading) {
        return <Spinner />
    }

    if (vmState.error) {
        return <AppAlert
            show={vmState.error}
            text={`Ошибка загрузки списка. ${vmState.error}`}
        />
    }

    return (
        <div className="row gx-2">
            <div className="col-md-8 mt-1">
                <VehicleMovesList />
            </div>
            <div className="col-md-4 mt-1">
                <Stack>
                    <VehicleMoveDetails move={vmState.items.find(move => move.id === vmState.selectedId)} />
                    <Stack className='mt-1' direction='horizontal' gap={2}>
                        <PrintPassButton />
                    </Stack>
                    <VehicleMoveActions vehicleMoveId={vmState.selectedId} className='mt-2' />
                </Stack>
            </div>

        </div>
    )
}

export default Dashboard