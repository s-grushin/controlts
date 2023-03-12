import { useState, useEffect, useCallback } from 'react'
import ArrivalDetails from './ArrivalDetails'
import OutgoDetails from './OutgoDetails'
import AppAlert from 'components/AppAlert'
import { STORAGE_KEYS } from 'constants/appConstants'
import { useCheckoutMutation } from 'redux/api/movesApi'

const OutgoPage = ({ move, triggerOptions }) => {

    const [weight, setWeight] = useState(0)
    const [cameraData, setCameraData] = useState([])
    const [outgoPhotoDetailsIsDiff, setOutgoPhotoDetailsIsDiff] = useState(false)
    const [checkout, { isError, error, reset }] = useCheckoutMutation()

    const { triggerSave, triggerOnError, triggerAfterSave } = triggerOptions?.save


    const saveCheckout = useCallback(async () => {

        const vehicleDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.newVehicleDetails))
        try {
            await checkout({ vehicleMoveId: move.id, vehicleDetails, weight, outgoPhotoDetailsIsDiff }).unwrap()
            return true
        } catch (error) {
            return false
        }

    }, [checkout, move, weight, outgoPhotoDetailsIsDiff])


    useEffect(() => {

        const saveByTrigger = async () => {

            if (triggerSave) {
                const ok = await saveCheckout()
                if (ok) {
                    triggerAfterSave()
                } else {
                    triggerOnError()
                }
            }

        }

        saveByTrigger()

    }, [triggerSave, triggerOnError, saveCheckout, triggerAfterSave])


    const outgoPhotoDetailsIsDiffState = { outgoPhotoDetailsIsDiff, setOutgoPhotoDetailsIsDiff }

    return (
        <>
            <ArrivalDetails vehicleMove={move} />
            <hr />
            <AppAlert title='Ошибка' text={JSON.stringify(error)} show={isError} clear={reset} />
            <OutgoDetails
                move={move}
                weightOptions={{ weight, setWeight }}
                cameraDataOptions={{ cameraData, setCameraData }}
                outgoPhotoDetailsIsDiffState={outgoPhotoDetailsIsDiffState}
            />
        </>
    )
}

export default OutgoPage