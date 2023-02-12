import { Tabs, Tab } from 'react-bootstrap'
import Accountant from './Accountant'
import Dispatcher from './Dispatcher/Dispatcher'
import Inspector from './Inspector/Inspector'

const VehicleMoveActions = ({ vehicleMoveId, ...props }) => {
    return (
        <Tabs
            id="vehicle-move-actions"
            justify
            defaultActiveKey='dispatcher'
            {...props}
        >
            <Tab eventKey="accountant" title="Бухгалтер">
                <Accountant vehicleMoveId={vehicleMoveId} />
            </Tab>
            <Tab eventKey="inspector" title="Инспектор">
                <Inspector />
            </Tab>
            <Tab eventKey="dispatcher" title="Диспетчер" className='mt-2'>
                <Dispatcher />
            </Tab>

        </Tabs>
    )
}

export default VehicleMoveActions