import Topbar from './Topbar'
import Spinner from '../../../components/Spinner'
import AppAlert from '../../../components/AppAlert'
import { useGetMovesQuery } from 'redux/api/movesApi'
import MovesTable from './MovesTable/MovesTable'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedId } from 'redux/slices/movesSlice'

const VehicleMovesList = () => {

  const { data, isFetching, isError } = useGetMovesQuery('', { pollingInterval: 50000000 })
  const dispatch = useDispatch()
  const state = useSelector(state => state.movesInfo)


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
            <MovesTable moves={data.rows} onRowClicked={handleRowClicked} selectedId={state.selectedId} />
      }
    </>
  )
}

export default VehicleMovesList