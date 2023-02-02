import { Card, Row, Col, Stack } from "react-bootstrap"
import AppButton from '../../../components/AppButton'

const Dispatcher = () => {
    return (
        <Card style={{ fontSize: 13 }} className='p-2'>

            <Row>

                <Col lg='6'>
                    <b className="fst-italic fs-6">Бухгалтер</b>
                    <hr />
                    <Row>
                        <Col className="fw-bold">ФИО Бухгалтера:</Col>
                        <Col>!!!ФИО Бухгалтера!!!</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Дата:</Col>
                        <Col>!!!Дата!!!</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Статус оплаты:</Col>
                        <Col>!!!Статус оплаты!!!</Col>
                    </Row>

                </Col>


                <Col lg='6' className="mt-sm-5 mt-lg-0">
                    <b className="fst-italic fs-6">Инспектор</b>
                    <hr />
                    <Row>
                        <Col className="fw-bold">ФИО Инспектора:</Col>
                        <Col>!!!ФИО инспектора!!!</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Дата:</Col>
                        <Col>!!!Дата!!!</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Разрешение на выезд:</Col>
                        <Col>!!!Разрешение на выезд!!!</Col>
                    </Row>

                </Col>

            </Row>

            <Stack direction="horizontal" gap='3' className="mt-2 mx-auto">
                <AppButton>
                    Проверить разрешение на выезд
                </AppButton>
                <AppButton>
                    Оформить выезд
                </AppButton>

            </Stack>

            {/* <Stack direction="horizontal">

                <Stack direction="vertical" gap={3}>

                    <Stack direction="horizontal" gap={3}>
                        <div>ФИО Инспектора</div>
                        <b>!!!ФИО инспектора!!!</b>
                    </Stack>

                    <Stack direction="horizontal" gap={3}>
                        <div>Дата</div>
                        <b>!!!Дата!!!</b>
                    </Stack>

                    <Stack direction="horizontal" gap={3}>
                        <div>Разрешение на выезд</div>
                        <b>!!!Разрешение на выезд!!!</b>
                    </Stack>

                </Stack>

                <Stack direction="vertical" gap={3}>

                    <Stack direction="horizontal" gap={3}>
                        <div>ФИО Бухгалтера</div>
                        <b>!!!ФИО инспектора!!!</b>
                    </Stack>

                    <Stack direction="horizontal" gap={3}>
                        <div>Дата</div>
                        <b>!!!Дата!!!</b>
                    </Stack>

                    <Stack direction="horizontal" gap={3}>
                        <div>Статус оплаты</div>
                        <b>!!!Разрешение на выезд!!!</b>
                    </Stack>

                </Stack>
            </Stack> */}
        </Card>
    )
}

export default Dispatcher