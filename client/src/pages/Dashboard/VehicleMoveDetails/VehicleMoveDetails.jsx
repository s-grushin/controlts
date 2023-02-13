import { Card, FormCheck, Row, Col } from 'react-bootstrap'
import InputGroup from '../../../components/InputGroup'
import VehicleDetails from './VehicleDetails/VehicleDetails'

const VehicleMoveDetails = ({ move }) => {

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

          <Row className='gx-1'>
            <Col xxl='6'>
              {/* Марка авто */}
              <InputGroup title='Марка авто' value={move?.brand?.name} className='mb-2' /></Col>
            <Col xxl='6'>
              {/* Модель авто */}
              <InputGroup title='Модель авто' value={move?.model?.name} className='mb-2' /></Col>
          </Row>

          <Row className='gx-1'>
            <Col xl='6'>
              {/* Вес на вьезде */}
              <InputGroup title='Вес на вьезде' value={move?.weightIn || 0} className='mb-2' />
            </Col>
            <Col xl='6'>
              {/* Вес на выезде */}
              <InputGroup title='Вес на выезде' value={move?.weightOut || ''} className='mb-2' />
            </Col>
          </Row>

          {/* Вид доставки */}
          <InputGroup title='Вид доставки' value={move?.deliveryType?.name} className='mb-2' />

          {/* Компания-получатель */}
          <InputGroup title='Компания' value={move?.company?.name} className='mb-2' />

          {/* Клиент ХФК-Биокон */}
          <FormCheck label='Клиент ХФК-Биокон' id='bioconClient' className='mb-2' checked={move?.isOwnCompany || false} readOnly />

          {/* Компания-получатель */}
          {move?.comment && <InputGroup title='Комментарий' value={move?.comment} className='mb-2' options={{ as: 'textarea' }} />}

          <VehicleDetails vehicleDetails={move.vehicleDetails} />

        </Card.Body>
      </Card>
    </div >
  )
}

VehicleMoveDetails.defaultProps = {
  move: {}
}

export default VehicleMoveDetails