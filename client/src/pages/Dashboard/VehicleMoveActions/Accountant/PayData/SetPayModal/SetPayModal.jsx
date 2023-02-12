import { useState } from 'react'
import Confirmation from '../../../../../../components/Modals/Confirmation'
import AppButton from '../../../../../../components/AppButton'
import useHttp from '../../../../../../hooks/useHttp'
import AppAlert from '../../../../../../components/AppAlert'
import useVehicleMovesContext from '../../../../VehicleMovesList/hooks/useVehicleMovesContext'

const SetPayModal = () => {

    const [isShow, setIsShow] = useState(false)
    const { request, loading, error, clearError } = useHttp(false, 500)

    const { contextValue } = useVehicleMovesContext()
    const vehicleMoveId = contextValue.state.selectedId
    const vmDispatch = contextValue.dispatch
    const isPaid = contextValue.state.items.find(item => item.id === vehicleMoveId)?.accountant?.isPaid

    const confirmHandler = async () => {
        const accountant = await request('/vehicleMoves/setPaid', 'patch', { vehicleMoveId, isPaid: !isPaid })
        if (accountant) {
            vmDispatch({ type: 'setPaid', payload: accountant })
            setIsShow(false)
        }
    }

    const btnText = isPaid ? 'Установить "Не оплачено"' : 'Установить "Оплачено"'

    return (
        <>
            <AppButton onClick={() => setIsShow(true)} style={{ fontSize: '10px' }}>
                {btnText}
            </AppButton>

            <Confirmation show={isShow} cancelHandler={() => setIsShow(false)} title='Подтверждение' confirmHandler={confirmHandler} isConfirming={loading}>
                Установить статус оплаты на {isPaid ? <b>"Не оплачено"</b> : <b>"Оплачено"</b>} ?
                <AppAlert show={error} text={error} clear={clearError} />
            </Confirmation>
        </>

    )
}

export default SetPayModal