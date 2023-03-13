import MoveServicesProvider from 'features/MoveServices'
import useMovesHelper from 'pages/Dashboard/VehicleMovesList/hooks/useMovesHelper'


const Services = () => {

    const { selectedMove } = useMovesHelper()

    return (
        <MoveServicesProvider move={selectedMove} readonly={selectedMove?.dateOut} />
    )
}

export default Services