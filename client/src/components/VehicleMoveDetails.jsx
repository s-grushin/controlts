import React from 'react'
import { Card, Col, Row, InputGroup, FormControl, FormCheck, Table } from 'react-bootstrap'

const VehicleMoveDetails = () => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            <h6>Детальные данные</h6>
          </Card.Title>

          <Row>
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
          </Row>

          <Row>
            <Col md={4}>
              {/* Вес */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Вес</InputGroup.Text>
                <FormControl type='number' aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
            </Col>
            <Col md={8}>
              {/* Вид доставки */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Вид доставки</InputGroup.Text>
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
            </Col>
          </Row>

          <Row>
            {/* Компания-получатель */}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">Компания-получатель</InputGroup.Text>
              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>

            {/* Клиент ХФК-Биокон */}
            <InputGroup size="sm" className="mb-3">
              <FormCheck label='Клиент ХФК-Биокон' id='bioconClient' />
            </InputGroup>
          </Row>

          <Row>
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
          </Row>
          <Card.Img variant="bottom" src="/image" />
        </Card.Body>
      </Card>
    </div >
  )
}

export default VehicleMoveDetails