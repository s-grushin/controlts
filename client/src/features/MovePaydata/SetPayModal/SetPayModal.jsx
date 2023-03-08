import { useState } from 'react'
import Confirmation from 'components/Modals/Confirmation'
import AppButton from 'components/AppButton'
import AppAlert from 'components/AppAlert'
import { useSavePayDataMutation } from 'redux/api/movesApi'


const SetPayModal = ({ move }) => {

    const [isShow, setIsShow] = useState(false)
    const [savePayData, { isLoading, error, reset }] = useSavePayDataMutation()

    const alertError = error && JSON.stringify(error)

    const confirmHandler = () => {
        savePayData({ vehicleMoveId: move.id }).unwrap().then(() => setIsShow(false))
    }

    const cancelHandler = () => {
        setIsShow(false)
    }

    const isPaid = move?.payData?.isPaid

    const btnText = isPaid ? 'Установить "Не оплачено"' : 'Установить "Оплачено"'

    return (
        <>
            <AppButton onClick={() => setIsShow(true)} style={{ fontSize: '10px' }} disabled={!move}>
                {btnText}
            </AppButton>

            <Confirmation show={isShow} cancelHandler={cancelHandler} title='Подтверждение' confirmHandler={confirmHandler} isConfirming={isLoading}>
                Установить статус оплаты на {isPaid ? <b>"Не оплачено"</b> : <b>"Оплачено"</b>} ?
                <AppAlert show={alertError} text={alertError} clear={reset} />
            </Confirmation>
        </>

    )
}

export default SetPayModal