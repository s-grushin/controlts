import { useSelector } from 'react-redux'
import { useGetMovesQuery } from 'redux/api/movesApi'

const useMovesHelper = () => {

    const state = useSelector(state => state.movesInfo)
    const selectedId = state.selectedId

    const { data } = useGetMovesQuery()
    const selectedMove = data?.rows?.find(item => item.id === selectedId)



    return { selectedId, selectedMove }
}

export default useMovesHelper