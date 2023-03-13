import Button from "components/Button"
import { useEffect } from "react"
import useCalculateServices from "../useCalculateServices"

const CalculateServices = ({ moveId, onSuccess, onError }) => {

    const { calculateServices, loading, error, clearError } = useCalculateServices(moveId)

    const handleClick = async () => {
        const val = await calculateServices()
        if (val) {
            onSuccess(val)
        }
    }

    useEffect(() => {
        if (error) {
            onError(error)
            clearError()
        }

    }, [error, onError, clearError])

    return (
        <Button title='' clickHandler={handleClick} disabled={loading} style={{ padding: '1px' }}>
            Рассчитать
        </Button>
    )
}

export default CalculateServices