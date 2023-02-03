import { Tabs, Tab } from 'react-bootstrap'
import Accountant from './Accountant/Accountant'
import Dispatcher from './Dispatcher/Dispatcher'

const VehicleMoveActions = ({ vehicleMoveId, ...props }) => {
    return (
        <Tabs
            id="vehicle-move-actions"
            justify
            defaultActiveKey='dispatcher'
            {...props}
        >
            <Tab eventKey="accountant" title="Бухгалтер">
                <Accountant />
            </Tab>
            <Tab eventKey="inspector" title="Инспектор">
                Инспектор
            </Tab>
            <Tab eventKey="dispatcher" title="Диспетчер" className='mt-2'>
                <Dispatcher />
            </Tab>

        </Tabs>
    )
}

export default VehicleMoveActions