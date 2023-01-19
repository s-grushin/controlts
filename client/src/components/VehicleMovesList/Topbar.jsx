import { useContext } from 'react'
import { Form, NavDropdown, Stack } from 'react-bootstrap'
import { vehicleMoveActions as vmActions, VehicleMovesContext } from '../../context/VehicleMovesProvider'


const Topbar = ({ ...props }) => {

    const { state } = useContext(VehicleMovesContext)


    const setFilterHandler = (filterType, event) => {
        //setFilterTitle(event.target.innerText)
        vmActions.fetchItems(filterType)
        vmActions.setVehicleFilterTitle(event.target.innerText)
    }

    return (
        <Stack
            direction='horizontal'
            {...props}
        >
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Поиск"
                    className="me-2"
                    aria-label="Search"
                    size='sm'
                />

                <NavDropdown title={`Показать автомобили (${state.vehicleFilterTitle})`} id="basic-nav-dropdown" className='my-auto'>
                    <NavDropdown.Item onClick={(e) => setFilterHandler({}, e)}>Все</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setFilterHandler({ type: 'onTerritory' }, e)}>На территории</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setFilterHandler({ type: 'last2days' }, e)}>За двое суток</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setFilterHandler({ type: 'last7days' }, e)}>За последнюю неделю</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setFilterHandler({ type: 'last30days' }, e)}>За последний месяц</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setFilterHandler({ type: 'thisYear' }, e)}>За этот год</NavDropdown.Item>
                </NavDropdown>
            </Form>
        </Stack >

    )
}

export default Topbar