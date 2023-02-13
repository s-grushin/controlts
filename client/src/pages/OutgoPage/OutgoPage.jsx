import { Card, Col, FormCheck, Row } from 'react-bootstrap'
import InputGroup from '../../components/InputGroup'
import VehicleDetails from '../Dashboard/VehicleMoveDetails/VehicleDetails/VehicleDetails'
import Spinner from '../../components/Spinner'
import useFetchItem from '../../hooks/useFetchItem'

const OutgoPage = ({ vehicleMoveId }) => {

    const { item: vehicleMove, loading, error } = useFetchItem(`/vehicleMoves/${vehicleMoveId}`)

    return (
        <>
            <Card >
                {
                    loading ? <Spinner /> : error ? `ошибка загрузки: ${error}` :

                        <Card.Body>
                            <Card.Title className='fs-6'>Данные при въезде</Card.Title>

                            <Row className='gx-1'>
                                <Col>
                                    <InputGroup title='Марка авто' value={vehicleMove?.brand?.name} />
                                </Col>
                                <Col>
                                    <InputGroup title='Компания-получатель' value={vehicleMove?.company?.name} />
                                </Col>
                            </Row>

                            <Row className='mt-2 gx-1'>
                                <Col>
                                    <InputGroup title='Модель ТС' value={vehicleMove?.model?.name} />
                                </Col>
                                <Col>
                                    <InputGroup title='Вид доставки' value={vehicleMove?.deliveryType?.name} />
                                </Col>
                            </Row>

                            <Row className='mt-2 gx-1'>
                                <Col>
                                    <InputGroup title='Вес' value={vehicleMove?.weightIn} />
                                </Col>
                                <Col>
                                    <FormCheck label='Клиент ХФК-Биокон' id='bioconClient' checked={true} readOnly />
                                </Col>
                            </Row>

                            <Row className='mt-2'>
                                <Col>
                                    <VehicleDetails vehicleDetails={vehicleMove?.vehicleDetails} />
                                </Col>
                            </Row>

                        </Card.Body>
                }
            </Card>
            <hr />
            <Card>
                {
                    loading ? <Spinner /> : error ? `ошибка загрузки: ${error}` :
                        <Card.Body>
                            <Card.Title className='fs-6'>Данные при выезде</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                }

            </Card>
        </>
    )
}

export default OutgoPage