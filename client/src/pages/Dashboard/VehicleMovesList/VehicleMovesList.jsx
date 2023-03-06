import Topbar from './Topbar'
import Spinner from '../../../components/Spinner'
import AppAlert from '../../../components/AppAlert'
import { useGetMovesQuery } from 'redux/api/movesApi'
import MovesTable from './MovesTable/MovesTable'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedId } from 'redux/slices/movesSlice'
import MovePagination from './MovePagination'
import { useState } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'
import { STORAGE_KEYS } from 'constants/appConstants'

const VehicleMovesList = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const state = useSelector(state => state.movesInfo)
  const [pageSize, setPageSize] = useLocalStorage(STORAGE_KEYS.movesPageSize, 20)
  console.log(pageSize);

  const { data, isFetching, isError } = useGetMovesQuery({
    limit: pageSize,
    offset: (currentPage - 1) * pageSize
  }, { pollingInterval: 50000000, skip: !pageSize })

  const pagesQty = Math.ceil(data?.count / pageSize)


  const handleRowClicked = (selectedId) => {
    dispatch(setSelectedId({ id: selectedId }))
  }

  return (
    <>
      <Topbar />
      {
        isError
          ?
          <div className='mt-2'>
            <AppAlert
              show={isError}
              text={isError}
              title='Ошибка при загрузке списка'
              clear={() => dispatch({ type: 'clearError' })}
            />
          </div>
          :
          isFetching
            ?
            <div className='mt-5 d-flex justify-content-center align-middle'>
              <Spinner />
            </div>
            :
            <>
              {data?.rows && <MovesTable moves={data.rows} onRowClicked={handleRowClicked} selectedId={state.selectedId} />}
              <div className='d-flex justify-content-center'>
                {data && <MovePagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesQty={pagesQty} pageSize={pageSize} onPageSizeChange={setPageSize} />}
              </div>
            </>
      }
    </>
  )
}

export default VehicleMovesList