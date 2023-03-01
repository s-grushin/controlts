import { Card, Row, Col, Stack } from "react-bootstrap"
import AppButton from '../../../../components/AppButton'
import { formatDate } from '../../../../utils/common'
import { Check2 } from 'react-bootstrap-icons'
import OutgoModal from '../../../../pages/OutgoPage/OutgoModal'
import { useSelector } from 'react-redux'
import { getSelectedItem } from '../../../../redux/slices/vehicleMovesSlice'


const Dispatcher = () => {

    const vehicleMoves = useSelector(state => state.vehicleMoves)
    const vehicleMove = getSelectedItem(vehicleMoves)

    return (
        <Card style={{ fontSize: 13 }} className='p-2'>

            <Row>

                <Col lg='6'>
                    <b className="fst-italic fs-6">Бухгалтер</b>
                    <hr />
                    <Row>
                        <Col className="fw-bold">ФИО Бухгалтера:</Col>
                        <Col>{vehicleMove?.payData?.user?.fullName}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Дата:</Col>
                        <Col>{formatDate(vehicleMove?.payData?.paidDate)}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Статус оплаты:</Col>
                        <Col>
                            {vehicleMove?.payData?.isPaid && <Check2 style={{ color: 'green' }} size='30' />}
                        </Col>
                    </Row>

                </Col>


                <Col lg='6' className="mt-sm-5 mt-lg-0">
                    <b className="fst-italic fs-6">Инспектор</b>
                    <hr />
                    <Row>
                        <Col className="fw-bold">ФИО Инспектора:</Col>
                        <Col>{vehicleMove?.outgo?.user?.fullName}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Дата:</Col>
                        <Col>{formatDate(vehicleMove?.outgo?.date)}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Разрешение на выезд:</Col>
                        <Col>
                            {vehicleMove?.outgo?.outgoAllowed && <Check2 style={{ color: 'green' }} size='30' />}
                        </Col>
                    </Row>

                </Col>

            </Row>

            <Stack direction="horizontal" gap='3' className="mt-2 mx-auto">
                <AppButton>
                    Проверить разрешение на выезд
                </AppButton>
                <OutgoModal vehicleMoveId={vehicleMove?.id} />
            </Stack>

        </Card>
    )
}

export default Dispatcher