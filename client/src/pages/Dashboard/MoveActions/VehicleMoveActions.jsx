import { Tabs, Tab } from 'react-bootstrap'
import Accountant from './Accountant'
import Inspector from './Inspector'
import Dispatcher from './Dispatcher'

const MoveActions = () => {

    return (
        <Tabs
            id="vehicle-move-actions"
            justify
            defaultActiveKey='inspector'
            className='mt-1'
        >
            <Tab eventKey="accountant" title="Бухгалтер">
                <Accountant />
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

export default MoveActions