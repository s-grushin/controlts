import useMovesHelper from 'pages/Dashboard/VehicleMovesList/hooks/useMovesHelper'
import PayDataCard from './PayDataCard'

const PayData = () => {

    const { selectedMove } = useMovesHelper()

    return (
        <PayDataCard move={selectedMove} />
    )


}

export default PayData