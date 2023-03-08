import InputGroup from 'components/InputGroup'
import { Card, FormCheck, Row, Col } from 'react-bootstrap'
import VehicleTypeDetailsProvider from 'features/VehicleTypeDetails/ContextProvider'
import Photos from 'features/VehicleTypeDetails/Photos'
import VehicleTypeDetails from 'features/VehicleTypeDetails'

const MoveInfoCard = ({ move }) => {
    return (
        <Card>
            <Card.Body className='p-2'>

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


                <VehicleTypeDetailsProvider vehicleTypeDetails={move?.vehicleDetails?.filter(item => item.moveKind === 0)} readonly={true}>
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
    )
}

export default MoveInfoCard