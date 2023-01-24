import { useEffect, useContext } from 'react'
import { Row } from 'react-bootstrap'
import VehicleMovesList from '../../components/VehicleMovesList'
import VehicleMoveDetails from '../../components/VehicleMoveDetails'
import VehicleMoveActions from '../../components/VehicleMoveActions'
import { Stack } from 'react-bootstrap'
import PrintPass from '../../printForms/Pass/PrintPass'
import { VehicleMovesContext } from '../../context/VehicleMovesProvider'


const Dashboard = () => {

    const { state: vmState, fetchItems } = useContext(VehicleMovesContext)

    useEffect(() => {

        fetchItems()

    }, [fetchItems])


    return (
        <div>
            <div className="row gx-2">
                <div className="col-md-8 mt-1">
                    <VehicleMovesList />
                </div>
                <div className="col-md-4 mt-1">
                    <Stack>
                        <VehicleMoveDetails move={vmState.items.find(move => move.id === vmState.selectedId)} />
                        <Stack className='mt-1' direction='horizontal' gap={2}>
                            {/* <PrintPass /> */}
                        </Stack>
                        <VehicleMoveActions vehicleMoveId={vmState.selectedId} className='mt-2' />
                    </Stack>
                </div>
            </div>
            <Row>
                <PrintPass />
            </Row>
        </div>

    )
}

export default Dashboard