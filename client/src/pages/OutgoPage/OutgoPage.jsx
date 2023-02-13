import useFetchItem from '../../hooks/useFetchItem'
import ArrivalDetails from './ArrivalDetails'
import OutgoDetails from './OutgoDetails'

const OutgoPage = ({ vehicleMoveId }) => {

    const { item: vehicleMove, loading, error } = useFetchItem(`/vehicleMoves/${vehicleMoveId}`)

    return (
        <>
            <ArrivalDetails vehicleMove={vehicleMove} loading={loading} error={error} />
            <hr />
            <OutgoDetails vehicleMove={vehicleMove} />
        </>
    )
}

export default OutgoPage