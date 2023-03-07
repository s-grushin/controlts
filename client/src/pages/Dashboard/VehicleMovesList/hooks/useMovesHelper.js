import { useSelector, useDispatch } from 'react-redux'
import { useGetMovesQuery } from 'redux/api/movesApi'
import { setPagination, setSelectedId } from 'redux/slices/movesInfoSlice'
import useLocalStorage from 'hooks/useLocalStorage'
import { STORAGE_KEYS } from 'constants/appConstants'

const useMovesHelper = () => {

    const { currentPage } = useSelector(state => state.movesInfo.pagination)
    const [pageSize, setPageSize] = useLocalStorage(STORAGE_KEYS.movesPageSize, 20)

    //redux
    const dispatch = useDispatch()
    const movesInfo = useSelector(state => state.movesInfo)

    const query = useGetMovesQuery({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
    }, { pollingInterval: 50000000, skip: !pageSize })


    const selectedId = movesInfo.selectedId
    const selectedMove = query?.data?.rows?.find(item => item.id === selectedId)

    const changePage = (page) => {
        dispatch(setPagination({ currentPage: page }))
    }

    const setSelected = (id) => {
        dispatch(setSelectedId({ id }))
    }

    return { query, selectedId, selectedMove, setSelected, currentPage, changePage, pageSize, setPageSize }
}

export default useMovesHelper