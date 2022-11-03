import { useEffect, useState } from 'react'
import { Card, InputGroup, FormControl, FormCheck, Table, Stack } from 'react-bootstrap'
import Spinner from '../components/Spinner'

const VehicleMoveDetails = ({ moveId }) => {

  const [loading] = useState(false)

  useEffect(() => {

  }, [])

  if (loading) {
    return (
      <div className='mx-auto mt-5 d-flex justify-content-center'>
        <Spinner />
      </div>
    )
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
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>

          {/* Модель авто */}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Модель авто</InputGroup.Text>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>

          <Stack direction='horizontal' gap={1}>
            {/* Вес */}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">Вес</InputGroup.Text>
              <FormControl type='number' aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>

            {/* Вид доставки */}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">Вид доставки</InputGroup.Text>
              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
          </Stack>

          {/* Компания-получатель */}
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Компания-получатель</InputGroup.Text>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
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
              <tr>
                <td>AI3840EE</td>
                <td>Тягач</td>
              </tr>
              <tr>
                <td>AH1353IA</td>
                <td>Прицеп</td>
              </tr>
            </tbody>
          </Table>

          <Card.Img variant="bottom" src="/image" />
        </Card.Body>
      </Card>
    </div >
  )
}

export default VehicleMoveDetails