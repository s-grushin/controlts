import { Card, Row, Col, Stack } from "react-bootstrap"
import AppButton from '../../../../components/AppButton'
import useVehicleMovesContext from '../../VehicleMovesList/hooks/useVehicleMovesContext'
import { formatDate } from '../../../../utils/common'
import { Check2 } from 'react-bootstrap-icons'
import OutgoModal from '../../../../pages/OutgoPage/OutgoModal'

const Dispatcher = () => {

    const { contextValue } = useVehicleMovesContext()
    const vehicleMove = contextValue.state.items.find(item => item.id === contextValue.state.selectedId)

    return (
        <Card style={{ fontSize: 13 }} className='p-2'>

            <Row>

                <Col lg='6'>
                    <b className="fst-italic fs-6">Бухгалтер</b>
                    <hr />
                    <Row>
                        <Col className="fw-bold">ФИО Бухгалтера:</Col>
                        <Col>{vehicleMove?.accountant?.user?.fullName}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Дата:</Col>
                        <Col>{formatDate(vehicleMove?.accountant?.paidDate)}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Статус оплаты:</Col>
                        <Col>
                            {vehicleMove?.accountant?.isPaid && <Check2 style={{ color: 'green' }} size='30' />}
                        </Col>
                    </Row>

                </Col>


                <Col lg='6' className="mt-sm-5 mt-lg-0">
                    <b className="fst-italic fs-6">Инспектор</b>
                    <hr />
                    <Row>
                        <Col className="fw-bold">ФИО Инспектора:</Col>
                        <Col>{vehicleMove?.inspector?.user?.fullName}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Дата:</Col>
                        <Col>{formatDate(vehicleMove?.inspector?.date)}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Разрешение на выезд:</Col>
                        <Col>
                            {vehicleMove?.inspector?.outgoAllowed && <Check2 style={{ color: 'green' }} size='30' />}
                        </Col>
                    </Row>

                </Col>

            </Row>

            <Stack direction="horizontal" gap='3' className="mt-2 mx-auto">
                <AppButton>
                    Проверить разрешение на выезд
                </AppButton>
                {/* <AppButton>
                    Оформить выезд
                </AppButton> */}
                <OutgoModal />
            </Stack>

        </Card>
    )
}

export default Dispatcher