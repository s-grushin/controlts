import Table from '../Table'
import { formatDate } from '../../utils/common'
import Topbar from './Topbar'

const VehicleMovesList = ({ selectedMoveId, setSelectedMoveId, vehicleMoves }) => {

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
            vehicleMoves.map(item => (
              <tr
                key={item.id}
                onClick={() => setSelectedMoveId(item.id)}
                className={item.id === selectedMoveId ? 'selectedTableRow' : ''}
              >
                <td>{item.driver.fullName}</td>
                <td>{formatDate(item.dateIn, { withSeconds: true })}</td>
                <td>{formatDate(item.dateOut, { withSeconds: true })}</td>
                <td>{item.driverId}</td>
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