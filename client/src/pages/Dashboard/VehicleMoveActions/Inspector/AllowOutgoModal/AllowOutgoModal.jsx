import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import AppAlert from '../../../../../components/AppAlert'
import AppButton from "../../../../../components/AppButton"
import useVehicleMovesContext from "../../../VehicleMovesList/hooks/useVehicleMovesContext"
import Confirmation from "../../../../../components/Modals/Confirmation"
import useHttp from "../../../../../hooks/useHttp"
import InputGroup from '../../../../../components/InputGroup'
import useInputChange from '../../../../../hooks/useInputChange'

const AllowOutgoModal = () => {

    const [isShow, setIsShow] = useState(false)
    const { request, loading, error, clearError } = useHttp(false, 500)

    //modal inputs
    const [cdn, setCdn] = useState('')
    const [weightIn, setWeightIn] = useState(0)
    const [weightOut, setWeightOut] = useState(0)
    const [outgoAllowed, setOutgoAllowed] = useState(false)

    const inputChange = useInputChange()

    const { contextValue } = useVehicleMovesContext()
    const vehicleMoveId = contextValue.state.selectedId
    const vmDispatch = contextValue.dispatch
    const vehicleMove = contextValue.state.items.find(item => item.id === vehicleMoveId)

    const confirmHandler = async () => {

        const inspector = await request('/vehicleMoves/setOutgo', 'post', {
            vehicleMoveId,
            outgoAllowed,
            cdn,
            weightIn,
            weightOut,
        })

        if (inspector) {
            vmDispatch({ type: 'setOutgo', payload: { inspector, weightIn, weightOut } })
            setIsShow(false)
        }
    }

    useEffect(() => {

        setCdn(vehicleMove?.inspector?.cdn || '')
        setWeightIn(vehicleMove?.weightIn || 0)
        setWeightOut(vehicleMove?.weightOut || 0)
        setOutgoAllowed(vehicleMove?.inspector?.outgoAllowed || false)

    }, [vehicleMove?.weightIn, vehicleMove?.weightOut, vehicleMove?.inspector?.outgoAllowed, vehicleMove?.inspector?.cdn])


    return (
        <>
            <AppButton onClick={() => setIsShow(true)}>
                Разрешить выезд
            </AppButton>

            <Confirmation show={isShow} cancelHandler={() => setIsShow(false)} title='Разрешить выезд' confirmHandler={confirmHandler} isConfirming={loading}>
                <AppAlert show={error} text={error} clear={clearError} />

                <InputGroup name='cdn' title='№ ГТД:' readOnly={false} value={cdn} onChange={(e) => inputChange(e, setCdn)} />
                <InputGroup name='weightIn' className='mt-2' title='Вес на въезде:' readOnly={false} value={weightIn} onChange={(e) => inputChange(e, setWeightIn)} />
                <InputGroup name='weightOut' className='mt-2' title='Вес на выезде:' readOnly={false} value={weightOut} onChange={(e) => inputChange(e, setWeightOut)} />

                <Form.Check
                    name='outgoAllowed'
                    className='mt-2 '
                    type='checkbox'
                    label='Выезд разрешен'
                    id='outgoAllowed'
                    checked={outgoAllowed}
                    onChange={(e) => inputChange(e, setOutgoAllowed)}
                />

            </Confirmation>
        </>

    )
}

export default AllowOutgoModal