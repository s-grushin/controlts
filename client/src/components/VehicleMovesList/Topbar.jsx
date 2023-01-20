import { useContext } from 'react'
import { Form, NavDropdown, Stack } from 'react-bootstrap'
import { vehicleMoveActions as vmActions, VehicleMovesContext } from '../../context/VehicleMovesProvider'
import DateRangePicker from '../DateRangePicker'


const Topbar = ({ ...props }) => {

    const { state } = useContext(VehicleMovesContext)

    const setFilterHandler = (filterType, event) => {
        vmActions.fetchItems(filterType)
        vmActions.setVehicleFilterTitle(event.target.innerText)
    }

    const setDateRangeHandler = (range) => {

        vmActions.fetchItems({
            type: 'dateInRange',
            value: { from: range.dateFrom, to: range.dateTo }
        })
    }

    const dateRangePickerText = (state.dateInRange.from || state.dateInRange.to) ? `${state.dateInRange.from} - ${state.dateInRange.to}` : 'Период по дате въезда'

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

                <DateRangePicker
                    buttonText={dateRangePickerText}
                    onPicked={setDateRangeHandler}
                    defaultRange={{ from: state.dateInRange.from, to: state.dateInRange.to }}
                />
            </Form>
        </Stack >

    )
}

export default Topbar