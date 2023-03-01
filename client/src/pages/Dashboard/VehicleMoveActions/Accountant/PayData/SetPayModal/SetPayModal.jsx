import { useState } from 'react'
import Confirmation from '../../../../../../components/Modals/Confirmation'
import AppButton from '../../../../../../components/AppButton'
import AppAlert from '../../../../../../components/AppAlert'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, savePayData } from '../../../../../../redux/slices/vehicleMovePayDataSlice'

const SetPayModal = () => {

    const [isShow, setIsShow] = useState(false)
    const vmPayData = useSelector(state => state.vehicleMovePayData)

    const dispatch = useDispatch()

    const confirmHandler = async () => {
        dispatch(savePayData()).then(() => setIsShow(false))
    }

    const cancelHandler = () => {
        setIsShow(false)
        dispatch(clearError())
    }

    const isPaid = vmPayData.payData?.isPaid

    const btnText = isPaid ? 'Установить "Не оплачено"' : 'Установить "Оплачено"'

    return (
        <>
            <AppButton onClick={() => setIsShow(true)} style={{ fontSize: '10px' }}>
                {btnText}
            </AppButton>

            <Confirmation show={isShow} cancelHandler={cancelHandler} title='Подтверждение' confirmHandler={confirmHandler} isConfirming={vmPayData.status === 'loading'}>
                Установить статус оплаты на {isPaid ? <b>"Не оплачено"</b> : <b>"Оплачено"</b>} ?
                <AppAlert show={vmPayData.error} text={vmPayData.error} clear={() => dispatch(clearError())} />
            </Confirmation>
        </>

    )
}

export default SetPayModal