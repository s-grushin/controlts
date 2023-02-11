import { Row, Col } from 'react-bootstrap'
import AppButton from '../../../../../components/AppButton'

const PayData = () => {
    return (
        <Row style={{ fontSize: 13 }}>

            <Col lg='6'>
                <Row>
                    <Col className="fw-bold">ФИО Бухгалтера:</Col>
                    <Col>!!!ФИО Бухгалтера!!!</Col>
                </Row>

                <Row className='mt-2'>
                    <Col>
                        <AppButton>
                            Установить "Оплачено"
                        </AppButton>
                    </Col>
                    <Col>

                    </Col>
                </Row>

            </Col>


            <Col lg='6'>

                <Row>
                    <Col className="fw-bold">Дата оплаты:</Col>
                    <Col>!!!Дата оплаты!!</Col>
                </Row>

                <Row className="mt-3">
                    <Col className="fw-bold">Статус оплаты:</Col>
                    <Col></Col>
                </Row>

            </Col>

        </Row>
    )
}

export default PayData