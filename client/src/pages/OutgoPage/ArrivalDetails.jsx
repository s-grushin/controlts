import { Card, Col, FormCheck, Row } from "react-bootstrap"
import InputGroup from "../../components/InputGroup"
import Spinner from "../../components/Spinner"
import VehicleTypeDetailsProvider from 'features/VehicleTypeDetails/ContextProvider'
import Photos from "features/VehicleTypeDetails/Photos"
import VehicleTypeDetails from "features/VehicleTypeDetails"

const ArrivalDetails = ({ vehicleMove, loading, error }) => {

    return (
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
                                <VehicleTypeDetailsProvider
                                    //vehicleTypeDetails={vehicleMove?.vehicleDetails?.filter(item => item.moveKind === 0)}
                                    moveId={vehicleMove?.id}
                                    moveDetails={vehicleMove?.vehicleDetails?.filter(item => item.moveKind === 0)}
                                    readonly={true}
                                >
                                    <Row className='gx-1'>
                                        <Col>
                                            <VehicleTypeDetails />
                                        </Col>
                                        <Col>
                                            <Photos mode='all' />
                                        </Col>
                                    </Row>
                                </VehicleTypeDetailsProvider>
                            </Col>
                        </Row>

                    </Card.Body>
            }
        </Card>
    )
}

export default ArrivalDetails