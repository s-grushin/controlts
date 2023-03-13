import AppTable from "components/AppTable"
import { formatDate } from "utils/common"


const MovesTable = ({ moves, onRowClicked, selectedId }) => {
  return (
    <AppTable className='mt-1' bordered>
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
          moves.map(item => (
            <tr
              key={item.id}
              onClick={() => onRowClicked(item.id)}
              className={item.id === selectedId ? 'selectedTableRow' : ''}
              style={{ cursor: 'pointer' }}
            >
              <td>{item.ticket}</td>
              <td>{item.driver.fullName}</td>
              <td>{formatDate(item.dateIn, { withSeconds: true })}</td>
              <td>{formatDate(item.dateOut, { withSeconds: true })}</td>
              <td>{item.userIn.username}</td>
              <td>{item.parking.name}</td>
            </tr>
          ))
        }
      </tbody>
    </AppTable>
  )
}

export default MovesTable