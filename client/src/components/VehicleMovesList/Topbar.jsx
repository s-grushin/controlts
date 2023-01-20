import { useEffect, useContext } from 'react'
import { Form, NavDropdown, Stack } from 'react-bootstrap'
import { VehicleMovesContext } from '../../context/VehicleMovesProvider'
import DateRangePicker from '../DateRangePicker'
import { availableFilters } from '../../context/VehicleMovesProvider'


const Topbar = ({ ...props }) => {

    const { state, dispatch } = useContext(VehicleMovesContext)

    useEffect(() => {

        console.log('Topbar mounted');

    }, [])

    console.log(state);

    const setVehicleFilterHandler = (filterOptions) => {

        //vmActions.fetchItems(filterType)
        //vmActions.setVehicleFilterTitle(event.target.innerText)
        dispatch({ type: 'setVehicleFilter', payload: filterOptions })
    }

    const setDateRangeHandler = (range) => {

        // vmActions.fetchItems({
        //     type: 'dateInRange',
        //     value: { from: range.dateFrom, to: range.dateTo }
        // })

        dispatch({ type: 'setDateInFilter', payload: range })

    }

    const dateRangePickerText = state.filters.dateIn ? `${state.filters.dateIn.from} - ${state.filters.dateIn.to}` : 'Период по дате въезда'

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

                <NavDropdown title={`Показать автомобили (${state.vehicleFilterTitle})`} className='my-auto'>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler(null, e)}>Все</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler({ name: availableFilters.onTerritory.name }, e)}>На территории</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler({ name: availableFilters.lastDays.name, value: 2 }, e)}>За двое суток</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler({ name: availableFilters.lastDays.name, value: 7 }, e)}>За последнюю неделю</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler({ name: availableFilters.lastDays.name, value: 31 }, e)}>За последний месяц</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => setVehicleFilterHandler({ name: availableFilters.thisYear.name }, e)}>За этот год</NavDropdown.Item>
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