import { Card, InputGroup, FormControl, FormCheck, Table } from 'react-bootstrap'

const VehicleMoveDetails = ({ move }) => {

  console.log(move);
  //return null

  if (!move) {
    return null
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            <h6>Детальные данные</h6>
          </Card.Title>

          {/* Марка авто */}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Марка авто</InputGroup.Text>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled placeholder={move?.brand?.name} />
          </InputGroup>

          {/* Модель авто */}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Модель авто</InputGroup.Text>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled placeholder={move?.model?.name} />
          </InputGroup>


          {/* Вес */}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Вес</InputGroup.Text>
            <FormControl type='number' aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled placeholder={move?.weightIn} />
          </InputGroup>

          {/* Вид доставки */}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Вид доставки</InputGroup.Text>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled placeholder={move?.deliveryType.name} />
          </InputGroup>


          {/* Компания-получатель */}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Компания-получатель</InputGroup.Text>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled placeholder={move?.company?.name} />
          </InputGroup>

          {/* Клиент ХФК-Биокон */}
          <InputGroup size="sm" className="mb-3">
            <FormCheck label='Клиент ХФК-Биокон' id='bioconClient' />
          </InputGroup>


          <Table responsive bordered hover size='sm'>
            <thead>
              <tr>
                <th>Гос знак</th>
                <th>Тип</th>
              </tr>
            </thead>
            <tbody>
              {
                move.vehicleDetails.map(item => (
                  <tr key={item.id}>
                    <td>{item.number}</td>
                    <td>{item.vehicleType.name}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

          <Card.Img variant="bottom" src="/image" />
        </Card.Body>
      </Card>
    </div >
  )
}

export default VehicleMoveDetails