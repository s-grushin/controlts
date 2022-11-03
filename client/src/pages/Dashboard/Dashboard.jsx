import { Col, Row } from 'react-bootstrap'
import VehicleMovesList from '../../components/VehicleMovesList'
import VehicleMoveDetails from '../../components/VehicleMoveDetails'

const Dashboard = () => {
    return (
        <Row className='mt-2'>
            <Col md='8' className='pr-1'>
                <VehicleMovesList />
            </Col>
            <Col md='4'>
                <VehicleMoveDetails />
            </Col>
        </Row>
    )
}

export default Dashboard