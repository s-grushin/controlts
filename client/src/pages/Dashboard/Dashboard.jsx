import { useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
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

        <Row className="gx-2">
            <Col className="mt-1" md='8'>
                <VehicleMovesList />
            </Col>
            <Col className="mt-1" md='4'>
                <Stack className='mb-1' direction='horizontal' gap={2}>
                    <PrintPass />
                </Stack>
                <Stack>

                    <VehicleMoveDetails move={vmState.items.find(move => move.id === vmState.selectedId)} />
                    <VehicleMoveActions vehicleMoveId={vmState.selectedId} className='mt-2' />
                </Stack>
            </Col>
        </Row>

    )
}

export default Dashboard