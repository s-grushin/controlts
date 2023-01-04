import Table from '../components/Table'

const VehicleMovesList = ({ selectedId, setSelectedId, vehicleMoves }) => {
  return (
    <Table>
      <thead>
        <tr>
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
            <tr key={item.id}>
              <td>{item.driverId}</td>
              <td>15.04.2020 16:33</td>
              <td></td>
              <td>Нестеренко О.А</td>
              <td>Место №37</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default VehicleMovesList