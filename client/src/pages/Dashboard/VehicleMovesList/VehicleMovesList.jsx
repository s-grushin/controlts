import { useEffect } from 'react'
import Table from '../../../components/Table'
import { formatDate } from '../../../utils/common'
import Topbar from './Topbar'
import Spinner from '../../../components/Spinner'
import AppAlert from '../../../components/AppAlert'
import { useSelector, useDispatch } from 'react-redux'
import { fetchVehicleMoves, setSelectedId } from '../../../redux/slices/vehicleMovesSlice'

const VehicleMovesList = () => {

  const vehicleMoves = useSelector(state => state.vehicleMoves)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(fetchVehicleMoves()) }, [dispatch, vehicleMoves.filters])

  const rowClickHandler = (selectedId) => {
    dispatch(setSelectedId({ id: selectedId }))
  }

  return (
    <>
      <Topbar />
      {
        vehicleMoves.status === 'failed'
          ?
          <div className='mt-2'>
            <AppAlert
              show={vehicleMoves.error}
              text={vehicleMoves.error}
              title='Ошибка при загрузке списка'
              clear={() => dispatch({ type: 'clearError' })}
            />
          </div>
          :
          vehicleMoves.status === 'loading'
            ?
            <div className='mt-5 d-flex justify-content-center align-middle'>
              <Spinner />
            </div>
            :
            <Table className='mt-1'>
              <thead>
                <tr style={{ fontSize: 13, fontWeight: 'bold' }}>
                  <th>№</th>
                  <th>Водитель</th>
                  <th>Дата въезда</th>
                  <th>Дата выезда</th>
                  <th>Диспетчер</th>
                  <th>Место стоянки</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '14px' }}>
                {
                  vehicleMoves.items.map(item => (
                    <tr
                      key={item.id}
                      onClick={() => rowClickHandler(item.id)}
                      className={item.id === vehicleMoves.selectedId ? 'selectedTableRow' : 'asd'}
                    >
                      <td>{item.id}</td>
                      <td>{item.driver.fullName}</td>
                      <td>{formatDate(item.dateIn, { withSeconds: true })}</td>
                      <td>{formatDate(item.dateOut, { withSeconds: true })}</td>
                      <td>{item.userIn.username}</td>
                      <td>{item.parking.name}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
      }
    </>
  )
}

export default VehicleMovesList