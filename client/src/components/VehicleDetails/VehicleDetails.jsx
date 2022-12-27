import { useState, useEffect } from "react"
import { PlusCircle, DashCircle } from 'react-bootstrap-icons'
import Table from "../Table"
import Button from '../Button'
import { Stack } from "react-bootstrap"
import useHttp from "../../hooks/useHttp"
import Spinner from "../Spinner"
import uuid from 'react-uuid'


const VehicleDetails = ({ vehicleDetails }) => {

    const [rows, setRows] = useState([])
    const [vehicleTypes, setVehicleTypes] = useState([])
    const [selectedId, setSelectedId] = useState(null)

    const { request, loading } = useHttp()

    const defaultVehicleType = () => {
        return vehicleTypes.length > 0 ? { ...vehicleTypes[0] } : { id: '', name: '' }
    }

    const preparedVehicleTypes = vehicleTypes.filter(item => item.orderInCheckout).sort((a, b) => a.orderInCheckout - b.orderInCheckout)

    const addHandler = () => {
        setRows([...rows, {
            uuid: uuid(),
            id: defaultVehicleType().id,
            name: defaultVehicleType().name,
            number: ''
        }])

        setSelectedId(null)
    }

    const deleteHandler = () => {
        const filteredRows = rows.filter(row => row.uuid !== selectedId)
        setRows(filteredRows)
        setSelectedId(null)
    }

    const onChangeCellHandler = (event) => {
        const updated = rows.map(item => {
            if (item.uuid === selectedId) {
                if (event.target.name === 'vehicleDetails') {
                    const vehicleType = vehicleTypes.find(item => item.id === parseInt(event.target.value))
                    return { ...item, id: vehicleType.id, name: vehicleType.name }
                } else {
                    return { ...item, [event.target.name]: event.target.value }
                }

            } else {
                return { ...item }
            }

        });

        setRows(updated)
    }

    const editFinishedHandler = () => {
        vehicleDetails.current = rows
    }

    const getNumber = (uuid) => {
        const row = rows.find(item => item.uuid === uuid)
        return row.number || ''
    }

    const selectRowHandler = (rowId) => {
        setSelectedId(rowId)
    }

    useEffect(() => {

        const fetchVehicleTypes = async () => {
            const data = await request('/vehicleTypes')
            const rows = data.rows.map(item => (
                { uuid: uuid(), ...item, number: '' }
            ))
            setRows(rows)
            setVehicleTypes(rows)
        }

        fetchVehicleTypes()

    }, [request])

    if (loading) {
        return <Spinner />
    }

    const tableContent = preparedVehicleTypes.map(row => (
        <tr
            key={row.uuid}
            onFocus={() => selectRowHandler(row.uuid)}
        >
            <td>
                <input
                    name='number'
                    type="text"
                    className='tableInput'
                    value={getNumber(row.uuid)}
                    onChange={onChangeCellHandler}
                />
            </td>
            <td>
                <select size='' className='tableInput' onChange={onChangeCellHandler} name='vehicleDetails' defaultValue={row.id}>
                    {
                        preparedVehicleTypes.map(item => (
                            <option
                                key={item.uuid}
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
        <div onBlur={editFinishedHandler}>
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
                    disabled={!selectedId}
                    onClick={deleteHandler}
                >
                    <DashCircle />
                </Button>

                <Button
                    title=''
                    variant='success'
                    onClick={addHandler}
                >
                    <PlusCircle />
                </Button>
            </Stack>
        </div>
    )
}

export default VehicleDetails