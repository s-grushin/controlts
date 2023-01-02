import { useState, useEffect, useRef } from 'react'
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
            ...emptyRow,
            ...item,
            rowId: uuid()
        }))
    return prepared
}

const emptyRow = {
    rowId: '',
    id: '', //id of vehicle type
    name: '', //name of vehicle type
    orderInCheckout: '',
    number: '' //гос номер
}

const VehicleDetails = ({ vehicleDetails, setVehicleDetails }) => {

    const [rows, setRows] = useState([])
    const vehicleTypes = useRef([])
    const [selectedRowId, setSelectedRowId] = useState(null)
    const { request, loading } = useHttp()

    useEffect(() => {

        const fetchVehicleTypes = async () => {
            const { rows } = await request('/vehicleTypes')
            const prepared = prepareRows(rows)
            setRows(prepared)
            vehicleTypes.current = rows
            setVehicleDetails(prepared)
        }

        fetchVehicleTypes()

    }, [request, setVehicleDetails])

    useEffect(() => {

        //if (vehicleDetails.length > 0) {
        setRows(vehicleDetails)
        //}

    }, [vehicleDetails])



    if (loading) {
        return <Spinner />
    }




    // берем данные с vehicleDetails когда пользователь получает распознанные номера с сервера 
    const source = vehicleDetails.length > 0 ? vehicleDetails : rows

    const onChangeCellHandler = (event) => {

        const selectedRow = getRow(selectedRowId)

        const updated = rows.map(row => {
            if (row.rowId === selectedRowId) {
                if (event.target.name === 'vehicleDetails') {
                    const vehicleTypeId = parseInt(event.target.value)
                    return { ...selectedRow, id: vehicleTypeId, name: getVehicleType(vehicleTypeId)?.name }
                } else {
                    return { ...selectedRow, [event.target.name]: event.target.value }
                }
            } else {
                return { ...row }
            }

        });
        setRows(updated)
    }

    const getRow = (rowId) => {
        return rows.find(row => row.rowId === rowId)
    }

    const getVehicleType = (vehicleTypeId) => {
        return vehicleTypes.current.find(item => item.id === vehicleTypeId)
    }

    const addRowHandler = () => {
        setRows([
            ...rows,
            { ...emptyRow, rowId: uuid(), },
        ])

        setSelectedRowId(null)
    }

    const deleteRowHandler = () => {
        const filteredRows = rows.filter(row => row.rowId !== selectedRowId)
        setRows(filteredRows)
        setSelectedRowId(null)
        //vehicleDetails.current = filteredRows
        setVehicleDetails(filteredRows)
    }

    const focusRowHandler = (rowId) => {
        setSelectedRowId(rowId)
    }

    const finishEditHandler = () => {
        //vehicleDetails.current = rows
        setVehicleDetails(rows)
    }

    const tableContent = source.map(row => (
        <tr
            key={row.rowId}
            onFocus={() => focusRowHandler(row.rowId)}
        >
            <td>
                <input
                    name='number'
                    type="text"
                    className='tableInput'
                    //value={getRow(row.rowId).number}
                    value={row.number}
                    onChange={onChangeCellHandler}
                />
            </td>
            <td>
                <select size='' className='tableInput' onChange={onChangeCellHandler} name='vehicleDetails'
                    defaultValue={row.id}>
                    <option value='0'>---Выбрать тип---</option>
                    {
                        vehicleTypes.current.map(item => (
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
        <div onBlur={finishEditHandler}>
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