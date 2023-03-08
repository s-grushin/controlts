import MoveInfoCard from './MoveInfoCard'
import useMovesHelper from '../VehicleMovesList/hooks/useMovesHelper'


const MoveInfo = () => {

  const { selectedMove } = useMovesHelper()

  return (
    <MoveInfoCard move={selectedMove} />
  )
}


export default MoveInfo