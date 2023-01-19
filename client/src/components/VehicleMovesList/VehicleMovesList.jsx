import Table from '../Table'
import { formatDate } from '../../utils/common'
import Topbar from './Topbar'
import { VehicleMovesContext } from '../../context/VehicleMovesProvider'
import { useContext } from 'react'


const VehicleMovesList = () => {

  const { state, dispatch } = useContext(VehicleMovesContext)

  console.log(state);

  return (
    <>
      <Topbar />
      <Table className='mt-1'>
        <thead>
          <tr style={{ fontSize: 13, fontWeight: 'bold' }}>
            <th>Водитель</th>
            <th>Дата заезда</th>
            <th>Дата выезда</th>
            <th>Диспетчер</th>
            <th>Место стоянки</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: '14px' }}>
          {
            state.items.map(item => (
              <tr
                key={item.id}
                onClick={() => dispatch({ type: 'setSelectedItem', payload: item.id })}
                className={item.id === state.selectedId ? 'selectedTableRow' : 'asd'}
              >
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
    </>

  )
}

export default VehicleMovesList