import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import AppAlert from '../../../../../components/AppAlert'
import AppButton from "../../../../../components/AppButton"
import Confirmation from "../../../../../components/Modals/Confirmation"
import InputGroup from '../../../../../components/InputGroup'
import useInputChange from '../../../../../hooks/useInputChange'
import { useSelector, useDispatch } from 'react-redux'
import { saveOutgo, clearError } from '../../../../../redux/slices/vehicleMoveOutgoSlice'


const AllowOutgoModal = () => {

    const [isShow, setIsShow] = useState(false)

    //modal inputs
    const [cdn, setCdn] = useState('')
    const [outgoAllowed, setOutgoAllowed] = useState(false)

    const inputChange = useInputChange()

    const outgo = useSelector(state => state.vehicleMoveOutgo)
    const dispatch = useDispatch()

    const confirmHandler = async () => {
        dispatch(saveOutgo({ cdn, outgoAllowed })).then(() => setIsShow(false))
    }

    const _cdn = outgo?.data?.cdn || ''
    const _outgoAllowed = outgo?.data?.outgoAllowed || false

    useEffect(() => {

        setCdn(_cdn)
        setOutgoAllowed(_outgoAllowed)

    }, [_cdn, _outgoAllowed])


    return (
        <>
            <AppButton onClick={() => setIsShow(true)}>
                Разрешить выезд
            </AppButton>

            <Confirmation
                show={isShow}
                cancelHandler={() => setIsShow(false)}
                title='Разрешить выезд'
                confirmHandler={confirmHandler}
                isConfirming={outgo.status === 'loading'}
            >
                <AppAlert show={outgo.error} text={outgo.error} clear={clearError} />
                <InputGroup name='cdn' title='№ ГТД:' readOnly={false} value={cdn} onChange={(e) => inputChange(e, setCdn)} />
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