import { Tabs, Tab } from 'react-bootstrap'
import Accountant from './Accountant'
import Inspector from './Inspector'
import Dispatcher from './Dispatcher'
import useLocalStorage from 'hooks/useLocalStorage'
import { STORAGE_KEYS } from 'constants/appConstants'

const MoveActions = () => {

    const [tab, setTab] = useLocalStorage(STORAGE_KEYS.moveActionsTab, 'dispatcher')

    const handleSelect = (tab) => {
        setTab(tab)
    }

    return (
        <Tabs
            id="vehicle-move-actions"
            activeKey={tab}
            justify
            className='mt-1'
            onSelect={handleSelect}
        >
            <Tab eventKey="accountant" title="Бухгалтер" >
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