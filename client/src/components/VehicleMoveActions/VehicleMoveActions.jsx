import { Tabs, Tab } from 'react-bootstrap'

const VehicleMoveActions = ({ vehicleMoveId, ...props }) => {
    return (
        <Tabs
            id="vehicle-move-actions"
            justify
            {...props}
        >
            <Tab eventKey="dispatcher" title="Диспетчер">
                Диспетчер
            </Tab>
            <Tab eventKey="accountant" title="Бухгалтер">
                Бухгалтер
            </Tab>
            <Tab eventKey="inspector" title="Инспектор">
                Инспектор
            </Tab>
        </Tabs>
    )
}

export default VehicleMoveActions