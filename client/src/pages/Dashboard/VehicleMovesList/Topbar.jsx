import { Form, NavDropdown, Stack } from 'react-bootstrap'
import DateRangePicker from '../../../components/DateRangePicker'
import { formatDate } from '../../../utils/common'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, getActiveFilter } from '../../../redux/slices/vehicleMovesSlice'

const Topbar = ({ ...props }) => {

    const filters = useSelector(state => state.vehicleMoves.filters)
    const dispatch = useDispatch()

    const activeVehicleFilter = getActiveFilter(filters, 'vehicles')

    const setVehicleFilterHandler = (pickedFilterName) => {

        if (pickedFilterName === 'pickedDateIn') {

        } else {
            dispatch(setFilter({ filterType: 'vehicles', filterName: pickedFilterName }))
        }
    }

    const setDateRangeHandler = (range) => {
        dispatch(setFilter({ filterType: 'vehicles', filterName: 'pickedDateIn', value: range }))
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

            </Form>

            <NavDropdown title={`Показать автомобили (${activeVehicleFilter.title})`} className='my-auto'>
                {
                    filters.vehicles.map(item =>
                    (<NavDropdown.Item
                        key={item.name}
                        onClick={() => setVehicleFilterHandler(item.name)}
                    >
                        {item.name === 'pickedDateIn'
                            ?
                            <DateRangePicker
                                onPicked={setDateRangeHandler}
                                buttonText={item.title}
                                defaultRange={{ from: '', to: '' }}
                                renderButton={() => item.title}
                            />
                            : item.title}

                    </NavDropdown.Item>)
                    )
                }
            </NavDropdown>

        </Stack >

    )
}

export default Topbar