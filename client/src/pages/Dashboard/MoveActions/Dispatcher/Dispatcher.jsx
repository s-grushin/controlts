import { Card, Row, Col, Stack } from "react-bootstrap"
import AppButton from "components/AppButton"
import { formatDate } from "utils/common"
import { Check2 } from 'react-bootstrap-icons'
import OutgoModal from "pages/OutgoPage/OutgoModal"
import useMovesHelper from "pages/Dashboard/VehicleMovesList/hooks/useMovesHelper"


const Dispatcher = () => {

    const { selectedMove } = useMovesHelper()

    return (
        <Card style={{ fontSize: 13 }} className='p-2'>

            <Row>

                <Col lg='6'>
                    <b className="fst-italic fs-6">Бухгалтер</b>
                    <hr />
                    <Row>
                        <Col className="fw-bold">ФИО Бухгалтера:</Col>
                        <Col>{selectedMove?.payData?.user?.fullName}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Дата:</Col>
                        <Col>{formatDate(selectedMove?.payData?.paidDate)}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Статус оплаты:</Col>
                        <Col>
                            {selectedMove?.payData?.isPaid && <Check2 style={{ color: 'green' }} size='30' />}
                        </Col>
                    </Row>

                </Col>


                <Col lg='6' className="mt-sm-5 mt-lg-0">
                    <b className="fst-italic fs-6">Инспектор</b>
                    <hr />
                    <Row>
                        <Col className="fw-bold">ФИО Инспектора:</Col>
                        <Col>{selectedMove?.outgo?.user?.fullName}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Дата:</Col>
                        <Col>{formatDate(selectedMove?.outgo?.date)}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Разрешение на выезд:</Col>
                        <Col>
                            {selectedMove?.outgo?.outgoAllowed && <Check2 style={{ color: 'green' }} size='30' />}
                        </Col>
                    </Row>

                </Col>

            </Row>

            <Stack direction="horizontal" gap='3' className="mt-2 mx-auto">
                {
                    !selectedMove?.dateOut
                    &&
                    <AppButton disabled={!selectedMove}>
                        Проверить разрешение на выезд
                    </AppButton>
                }
                {!selectedMove?.dateOut && <OutgoModal move={selectedMove} />}
            </Stack>

        </Card>
    )
}

export default Dispatcher