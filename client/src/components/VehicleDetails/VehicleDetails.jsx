import { useState, useEffect } from 'react'
import { Stack } from 'react-bootstrap'
import { DashCircle, PlusCircle } from 'react-bootstrap-icons'
import useHttp from '../../hooks/useHttp'
import Button from '../Button'
import Spinner from '../Spinner'
import Table from '../Table'
import uuid from 'react-uuid'

const prepareRows = (vehicleTypes) => {
    const prepared = vehicleTypes
        .filter(item => item.orderInCheckout)
        .sort((a, b) => a.orderInCheckout - b.orderInCheckout)
        .map(item => ({
            ...item,
            rowId: uuid()
        }))
    console.log(prepared);
    return prepared
}

const VehicleDetails = () => {

    const [rows, setRows] = useState([])
    const [selectedRowId, setSelectedRowId] = useState(null)
    const { request, loading } = useHttp()

    useEffect(() => {

        const fetchVehicleTypes = async () => {
            const { rows } = await request('/vehicleTypes')
            const prepared = prepareRows(rows)
            setRows(prepared)
        }

        fetchVehicleTypes()

    }, [request])

    if (loading) {
        return <Spinner />
    }

    const onChangeCellHandler = (event) => {

        console.log(selectedRowId);
        const selectedRow = getRow(selectedRowId)

        console.log(rows);

        const updated = rows.map(row => {
            if (row.rowId === selectedRowId) {
                if (event.target.name === 'vehicleDetails') {
                    return { ...selectedRow, id: selectedRow.id }
                } else {
                    return { ...selectedRow, [event.target.name]: event.target.value }
                }
            } else {
                return { ...row }
            }

        });
        
        console.log(updated);

        setRows(updated)
    }

    const getRow = (rowId) => {
        return rows.find(row => row.rowId === rowId)
    }

    const addRowHandler = () => {
        setRows([...rows, {
            uuid: uuid(),
            number: ''
        }])

        setSelectedRowId(null)
    }

    const deleteRowHandler = () => {
        const filteredRows = rows.filter(row => row.rowId !== setSelectedRowId)
        setRows(filteredRows)
        setSelectedRowId(null)
    }

    const focusRowHandler = (rowId) => {
        setSelectedRowId(rowId)
    }

    const tableContent = rows.map(row => (
        <tr
            key={row.rowId}
            onFocus={() => focusRowHandler(row.rowId)}
        >
            <td>
                <input
                    name='number'
                    type="text"
                    className='tableInput'
                    value={getRow(row.rowId).number}
                    onChange={onChangeCellHandler}
                />
            </td>
            <td>
                <select size='' className='tableInput' onChange={onChangeCellHandler} name='vehicleDetails' defaultValue={row.id}>
                    {
                        rows.map(item => (
                            <option
                                key={item.rowId}
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
                    disabled={!selectedRowId}
                    onClick={deleteRowHandler}
                >
                    <DashCircle />
                </Button>

                <Button
                    title=''
                    variant='success'
                    onClick={addRowHandler}
                >
                    <PlusCircle />
                </Button>
            </Stack>
        </div>
    )
}

export default VehicleDetails