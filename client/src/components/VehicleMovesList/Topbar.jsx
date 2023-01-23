import { useState, useContext } from 'react'
import { Form, NavDropdown, Stack } from 'react-bootstrap'
import { VehicleMovesContext } from '../../context/VehicleMovesProvider'
import DateRangePicker from '../DateRangePicker'
import { availableFilters } from '../../context/VehicleMovesProvider'
import { formatDate } from '../../utils/common'

const Topbar = ({ ...props }) => {

    const [vehicleFilterText, setVehicleFilterText] = useState('Все')

    const { state, dispatch } = useContext(VehicleMovesContext)

    const setVehicleFilterHandler = (filterOptions, event) => {
        dispatch({ type: 'setVehicleFilter', payload: filterOptions })
        setVehicleFilterText(event.target.innerText)
    }

    const setDateRangeHandler = (range) => {

        dispatch({ type: 'setDateInFilter', payload: { from: range.dateFrom, to: range.dateTo } })

    }

    const dateRangePickerText = state.filters.dateIn.from || state.filters.dateIn.To
        ?
        `${formatDate(state.filters.dateIn.from, { withTime: false })} - ${formatDate(state.filters.dateIn.to, { withTime: false })}`
        :
        'Период по дате въезда'

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

                <NavDropdown title={`Показать автомобили (${vehicleFilterText})`} className='my-auto'>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler(null, e)}>Все</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler({ name: availableFilters.onTerritory.name, value: true }, e)}>На территории</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler({ name: availableFilters.lastDays.name, value: 2 }, e)}>За двое суток</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler({ name: availableFilters.lastDays.name, value: 7 }, e)}>За последнюю неделю</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler({ name: availableFilters.lastDays.name, value: 31 }, e)}>За последний месяц</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler({ name: availableFilters.thisYear.name, value: true }, e)}>За этот год</NavDropdown.Item>
                </NavDropdown>

                <DateRangePicker
                    buttonText={dateRangePickerText}
                    onPicked={setDateRangeHandler}
                    defaultRange={{ from: state.filters.dateIn.from, to: state.filters.dateIn.to }}
                />
            </Form>
        </Stack >

    )
}

export default Topbar