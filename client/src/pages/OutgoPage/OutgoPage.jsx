import { useState, useEffect, useCallback } from 'react'
import useFetchItem from '../../hooks/useFetchItem'
import ArrivalDetails from './ArrivalDetails'
import OutgoDetails from './OutgoDetails'
import useHttp from 'hooks/useHttp'
import AppAlert from 'components/AppAlert'
import { STORAGE_KEYS } from 'constants/appConstants'

const OutgoPage = ({ vehicleMoveId, triggerOptions }) => {

    const [weight, setWeight] = useState(0)
    const [cameraData, setCameraData] = useState([])
    const { request, error: errorCheckout, clearError: clearCheckoutError } = useHttp(false, 1000)

    const { item: vehicleMove, loading, error } = useFetchItem(`/vehicleMoves/${vehicleMoveId}`)

    const { triggerSave, triggerOnError, triggerAfterSave } = triggerOptions?.save


    const saveCheckout = useCallback(async () => {

        const vehicleDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.newVehicleDetails))
        const res = await request('vehicleMoves/checkout', 'post', { vehicleMoveId, vehicleDetails, weight })
        return res

    }, [request, vehicleMoveId, weight])


    useEffect(() => {

        const saveByTrigger = async () => {

            if (triggerSave) {
                const res = await saveCheckout()
                if (res) {
                    triggerAfterSave()
                } else {
                    triggerOnError()
                }
            }

        }

        saveByTrigger()

    }, [triggerSave, triggerOnError, saveCheckout, triggerAfterSave])


    return (
        <>
            <ArrivalDetails vehicleMove={vehicleMove} loading={loading} error={error} />
            <hr />
            <AppAlert title='Ошибка' text={errorCheckout} show={errorCheckout} clear={clearCheckoutError} />
            <OutgoDetails vehicleMove={vehicleMove} weightOptions={{ weight, setWeight }} cameraDataOptions={{ cameraData, setCameraData }} />
        </>
    )
}

export default OutgoPage