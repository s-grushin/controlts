import { Row, Col } from 'react-bootstrap'
import VehicleMovesList from './VehicleMovesList'
import MoveInfo from './MoveInfo'
import MoveActions from './MoveActions'
import { Stack } from 'react-bootstrap'
import PrintPass from '../ArrivalPage/PrintForms/Pass/PrintPass'

const Dashboard = () => {

    // const vehicleMoves = useSelector(state => state.vehicleMoves)
    const vehicleMoves = []

    return (

        <Row className="gx-2 mt-1">
            <Col className="overflow-auto vh-100" md='8'>
                <VehicleMovesList />
            </Col>
            <Col md='4'>
                <Stack className='mb-1' direction='horizontal' gap={2}>
                    <PrintPass vehicleMoveId={vehicleMoves.selectedId} />
                </Stack>
                <Stack>
                    <MoveInfo />
                    <MoveActions />
                    {/* <VehicleMoveActions vehicleMove={getSelectedItem(vehicleMoves)} className='mt-2' /> */}
                </Stack>
            </Col>
        </Row>

    )
}

export default Dashboard