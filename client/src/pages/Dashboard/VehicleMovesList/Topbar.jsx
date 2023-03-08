import { Form, NavDropdown, Stack } from 'react-bootstrap'
import DateRangePicker from 'components/DateRangePicker'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, availableFilters, getFilterById } from 'redux/slices/movesInfoSlice'
import { dateToLocaleISO } from 'utils/common'
import useMovesHelper from './hooks/useMovesHelper'

const getDateInRangeDefault = (value) => {

    const range = {
        from: dateToLocaleISO(new Date(value.from)).split('T')[0],
        to: dateToLocaleISO(new Date(value.to)).split('T')[0]
    }
    return range
}

const Topbar = ({ ...props }) => {

    const dispatch = useDispatch()
    const { filters } = useSelector(state => state.movesInfo)

    const { changePage } = useMovesHelper()

    const selectedMovesInFilter = getFilterById('movesIn', filters.movesIn.id)

    const setMovesInFilterHandler = (filterId) => {
        if (filterId === 8) {
            return
        }

        const filter = getFilterById('movesIn', filterId)
        dispatch(setFilter({ name: 'movesIn', filter: { id: filterId, value: filter.getValue() } }))
        changePage(1)
    }

    const setMovesInRangeHandler = (range) => {
        const filter = getFilterById('movesIn', 8)
        const value = filter.getValue(range.from, range.to)
        dispatch(setFilter({ name: 'movesIn', filter: { id: 8, value } }))
        changePage(1)
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

            <NavDropdown title={`Показать автомобили (${selectedMovesInFilter.title})`} className='my-auto'>
                {
                    availableFilters.movesIn.map(item =>
                    (<NavDropdown.Item
                        key={item.id}
                        onClick={() => setMovesInFilterHandler(item.id)}
                        active={item.id === selectedMovesInFilter.id}
                    >
                        {item.name === 'dateInRange'
                            ?
                            <DateRangePicker
                                onPicked={setMovesInRangeHandler}
                                buttonText={item.title}
                                defaultRange={filters?.movesIn?.id === 8 ? getDateInRangeDefault(filters.movesIn.value) : { from: '', to: '' }}
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