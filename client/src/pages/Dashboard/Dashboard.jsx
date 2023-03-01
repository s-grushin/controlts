import { Row, Col } from 'react-bootstrap'
import VehicleMovesList from './VehicleMovesList'
import VehicleMoveInfo from './VehicleMoveInfo'
import VehicleMoveActions from './VehicleMoveActions'
import { Stack } from 'react-bootstrap'
import PrintPass from '../ArrivalPage/PrintForms/Pass/PrintPass'
import { useSelector } from 'react-redux'
import { getSelectedItem } from '../../redux/slices/vehicleMovesSlice'
//import useVehicleMovesContext from './VehicleMovesList/hooks/useVehicleMovesContext'


const Dashboard = () => {

    const vehicleMoves = useSelector(state => state.vehicleMoves)

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
                    <VehicleMoveInfo vehicleMove={getSelectedItem(vehicleMoves)} />
                    <VehicleMoveActions vehicleMove={getSelectedItem(vehicleMoves)} className='mt-2' />
                </Stack>
            </Col>
        </Row>

    )
}

export default Dashboard