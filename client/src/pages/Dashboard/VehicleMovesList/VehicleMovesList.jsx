import Spinner from 'components/Spinner'
import AppAlert from 'components/AppAlert'
import MovesTable from './MovesTable/MovesTable'
import MovePagination from './MovePagination'
import Topbar from './Topbar'
import useMovesHelper from './hooks/useMovesHelper'

const VehicleMovesList = () => {

  const { query, setSelected, selectedId, currentPage, changePage, pageSize, setPageSize } = useMovesHelper()
  const { data, isFetching, isError, error } = query

  const pagesQty = Math.ceil(data?.count / pageSize)

  const handleRowClicked = (selectedId) => {
    setSelected(selectedId)
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
              text={JSON.stringify(error)}
              title='Ошибка при загрузке списка'
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
              {data?.rows && <MovesTable moves={data.rows} onRowClicked={handleRowClicked} selectedId={selectedId} />}
              <div className='d-flex justify-content-center'>
                {data && <MovePagination currentPage={currentPage} setCurrentPage={changePage} pagesQty={pagesQty} pageSize={pageSize} onPageSizeChange={setPageSize} />}
              </div>
            </>
      }
    </>
  )
}

export default VehicleMovesList