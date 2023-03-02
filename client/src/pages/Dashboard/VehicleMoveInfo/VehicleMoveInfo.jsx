import { Card, FormCheck, Row, Col } from 'react-bootstrap'
import InputGroup from '../../../components/InputGroup'
//import VehicleDetails from './VehicleDetails/VehicleDetails'
import Photos from 'features/VehicleTypeDetails/Photos'
import VehicleTypeDetailsProvider from 'features/VehicleTypeDetails/ContextProvider'
import VehicleTypeDetails from 'features/VehicleTypeDetails'


const VehicleMoveInfo = ({ vehicleMove }) => {

  if (!vehicleMove) {
    return null
  }

  return (
    <div>
      <Card>
        <Card.Body className='p-2'>

          <Card.Title>
            <h6>Детальные данные</h6>
          </Card.Title>

          <Row className='gx-1'>
            <Col xxl='6'>
              {/* Марка авто */}
              <InputGroup title='Марка авто' value={vehicleMove?.brand?.name} className='mb-2' /></Col>
            <Col xxl='6'>
              {/* Модель авто */}
              <InputGroup title='Модель авто' value={vehicleMove?.model?.name} className='mb-2' /></Col>
          </Row>

          <Row className='gx-1'>
            <Col xl='6'>
              {/* Вес на вьезде */}
              <InputGroup title='Вес на вьезде' value={vehicleMove?.weightIn || 0} className='mb-2' />
            </Col>
            <Col xl='6'>
              {/* Вес на выезде */}
              <InputGroup title='Вес на выезде' value={vehicleMove?.weightOut || ''} className='mb-2' />
            </Col>
          </Row>

          {/* Вид доставки */}
          <InputGroup title='Вид доставки' value={vehicleMove?.deliveryType?.name} className='mb-2' />

          {/* Компания-получатель */}
          <InputGroup title='Компания' value={vehicleMove?.company?.name} className='mb-2' />

          {/* Клиент ХФК-Биокон */}
          <FormCheck label='Клиент ХФК-Биокон' id='bioconClient' className='mb-2' checked={vehicleMove?.isOwnCompany || false} readOnly />

          {/* Компания-получатель */}
          {vehicleMove?.comment && <InputGroup title='Комментарий' value={vehicleMove?.comment} className='mb-2' options={{ as: 'textarea' }} />}


          <VehicleTypeDetailsProvider vehicleTypeDetails={vehicleMove.vehicleDetails?.filter(item => item.moveKind === 0)} readonly={true}>
            <Row className='gx-1'>
              <Col>
                <VehicleTypeDetails />
              </Col>
              <Col>
                <Photos />
              </Col>
            </Row>
          </VehicleTypeDetailsProvider>

        </Card.Body>
      </Card>
    </div >
  )
}

VehicleMoveInfo.defaultProps = {
  vehicleMove: {}
}

export default VehicleMoveInfo