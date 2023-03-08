import { Row, Col } from 'react-bootstrap'
import VehicleMovesList from './VehicleMovesList'
import MoveInfo from './MoveInfo'
import MoveActions from './MoveActions'
import { Stack } from 'react-bootstrap'
import MoveCommands from './MoveCommands'

const Dashboard = () => {

    return (

        <Row className="gx-2 mt-1">
            <Col className="overflow-auto vh-100" md='8'>
                <VehicleMovesList />
            </Col>
            <Col md='4'>
                <MoveCommands/>
                <Stack>
                    <MoveInfo />
                    <MoveActions />
                </Stack>
            </Col>
        </Row>

    )
}

export default Dashboard