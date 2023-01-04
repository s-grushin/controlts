import Table from '../components/Table'

const VehicleMovesList = ({ selectedId, setSelectedId }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ФИО водителя</th>
          <th>Гос знак</th>
          <th>Дата заезда</th>
          <th>Дата выезда</th>
          <th>ФИО диспетчера</th>
          <th>Место стоянки</th>
        </tr>
      </thead>
      <tbody style={{ fontSize: '14px' }}>
        <tr >
          <td>Скребантович Олександр</td>
          <td>ВС0420СМ</td>
          <td>15.04.2020 16:33</td>
          <td></td>
          <td>Нестеренко О.А</td>
          <td>Место №37</td>
        </tr>
        <tr>
          <td>Скребантович Олександр</td>
          <td>ВС0420СМ</td>
          <td>15.04.2020 16:33</td>
          <td></td>
          <td>Нестеренко О.А</td>
          <td>Место №37</td>
        </tr>
        <tr>
          <td>Скребантович Олександр</td>
          <td>ВС0420СМ</td>
          <td>15.04.2020 16:33</td>
          <td></td>
          <td>Нестеренко О.А</td>
          <td>Место №37</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default VehicleMovesList