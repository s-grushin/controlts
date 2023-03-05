import MoveInfoCard from './MoveInfoCard'
import useMovesHelper from '../VehicleMovesList/hooks/useMovesHelper'


const MoveInfo = () => {

  const { selectedMove } = useMovesHelper()

  if (!selectedMove) {
    return null
  }

  return (
    <MoveInfoCard move={selectedMove} />
  )
}


export default MoveInfo