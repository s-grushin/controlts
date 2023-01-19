import { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import { DashCircle, PlusCircle } from 'react-bootstrap-icons'
import { VehicleDetailsContext } from '../../context/VehicleDetailsProvider'
import Button from '../Button'
import Table from '../Table'

const VehicleDetails = () => {

    const { state, dispatch } = useContext(VehicleDetailsContext)

    const tableContent = state.rows.map(row => (
        <tr
            key={row.id}
            onFocus={() => dispatch({ type: 'selectRow', payload: row.id })}
        >
            <td>
                <input
                    name='number'
                    type="text"
                    className='tableInput'
                    value={row.number}
                    onChange={(e) => dispatch({
                        type: 'editRow',
                        payload: {
                            id: row.id, name: 'number', value: e.target.value
                        }
                    })}
                />
            </td>
            <td>
                <select size='' className='tableInput'
                    onChange={(e) => dispatch({
                        type: 'editRow',
                        payload: {
                            id: row.id, name: 'vehicleTypeId', value: e.target.value
                        }
                    })}
                    name='vehicleDetails'
                    defaultValue={row.vehicleTypeId}
                >
                    <option value='0'>---Выбрать тип---</option>
                    {
                        state.vehicleTypes.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </td>
        </tr >
    ))

    return (
        <div>
            <Table className='mb-0'>
                < thead >
                    <tr>
                        <th>Гос. знак</th>
                        <th>Тип</th>
                    </tr >
                </thead >

                <tbody>
                    {tableContent}
                </tbody>
            </Table>
            <Stack direction="horizontal" gap='1' className="m-1">

                <Button
                    title=''
                    variant='danger'
                    disabled={!state.selectedRowId}
                    onClick={() => dispatch({ type: 'deleteRow', payload: state.selectedRowId })}
                >
                    <DashCircle />
                </Button>

                <Button
                    title=''
                    variant='success'
                    onClick={() => dispatch({ type: 'addRow' })}
                >
                    <PlusCircle />
                </Button>

            </Stack>
        </div>
    )
}

export default VehicleDetails