import MoveServicesProvider from 'features/moveServices'
import useMovesHelper from 'pages/Dashboard/VehicleMovesList/hooks/useMovesHelper'


const Services = () => {

    const { selectedMove } = useMovesHelper()

    if (!selectedMove) {
        return null
    }

    return (
        <MoveServicesProvider move={selectedMove} readonly={selectedMove.dateOut} />
    )
}

export default Services