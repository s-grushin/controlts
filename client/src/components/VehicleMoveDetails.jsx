import { useState, useEffect } from 'react'
import Button from '../components/Button'
import { Card, FormCheck, Table, Row, Col, Stack } from 'react-bootstrap'
import InputGroup from './InputGroup'
import VehiclePhoto from './VehiclePhoto'

const VehicleMoveDetails = ({ move }) => {

  const [selectedMoveDetailId, setSelectedMoveDetailId] = useState(null)

  useEffect(() => {

    setSelectedMoveDetailId(move?.vehicleDetails[0]?.id)

  }, [move])

  if (!move) {
    return null
  }

  const vehicleDetail = selectedMoveDetailId && move.vehicleDetails.find(item => item.id === selectedMoveDetailId)
  return (
    <div>
      <Card>
        <Card.Body>

          <Card.Title>
            <h6>Детальные данные</h6>
          </Card.Title>

          {/* Марка авто */}
          <InputGroup title='Марка авто' value={move?.brand?.name} className='mb-2' />

          {/* Модель авто */}
          <InputGroup title='Модель авто' value={move?.model?.name} className='mb-2' />

          <Stack direction='horizontal' gap={1}>
            {/* Вес на вьезде */}
            <InputGroup title='Вес на вьезде' value={move?.weightIn || 0} className='mb-2' />

            {/* Вес на выезде */}
            <InputGroup title='Вес на выезде' value={move?.weightOut || ''} className='mb-2' />
          </Stack>

          {/* Вид доставки */}
          <InputGroup title='Вид доставки' value={move?.deliveryType?.name} className='mb-2' />

          {/* Компания-получатель */}
          <InputGroup title='Компания' value={move?.company?.name} className='mb-2' />

          {/* Клиент ХФК-Биокон */}
          <FormCheck label='Клиент ХФК-Биокон' id='bioconClient' className='mb-2' checked={move?.isOwnCompany} readOnly />

          {/* Компания-получатель */}
          <InputGroup title='Комментарий' value={move?.comment} className='mb-2' options={{ as: 'textarea' }} />

          <Row>
            <Col xl='6'>
              <Stack direction='vertical'>
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
                        <tr
                          key={item.id}
                          onClick={() => setSelectedMoveDetailId(item.id)}
                          className={item.id === selectedMoveDetailId ? 'selectedTableRow' : ''}
                          style={{ cursor: 'pointer' }}
                        >
                          <td>{item.number}</td>
                          <td>{item.vehicleType.name}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
                <Button title='Печатать пропуск' disableFlex={true} />
              </Stack>
            </Col>
            <Col xl='6'>
              <VehiclePhoto
                number={vehicleDetail?.number}
                photoUrl={vehicleDetail?.photo}
              />
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </div >
  )
}

export default VehicleMoveDetails