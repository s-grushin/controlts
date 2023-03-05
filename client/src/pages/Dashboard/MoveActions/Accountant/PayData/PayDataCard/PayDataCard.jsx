import { Row, Col } from 'react-bootstrap'
import { Check2 } from 'react-bootstrap-icons'
import SetPayModal from 'features/MovePaydata/SetPayModal'
import { formatDate } from 'utils/common'

const PayDataCard = ({ move }) => {
    return (
        <>
            <Row style={{ fontSize: 13 }}>

                <Col lg='6'>
                    <Row>
                        <Col className="fw-bold">ФИО Бухгалтера:</Col>
                        <Col>{move?.payData?.user?.fullName}</Col>
                    </Row>

                    <Row className='mt-2'>
                        <Col>
                            {!move?.dateOut && <SetPayModal move={move} />}
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </Col>

                <Col lg='6'>

                    <Row>
                        <Col className="fw-bold">Дата оплаты:</Col>
                        <Col>{formatDate(move?.payData?.paidDate)}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Статус оплаты:</Col>
                        <Col>
                            {
                                move?.payData?.isPaid ? <Check2 style={{ color: 'green' }} size='30' /> : ''
                            }
                        </Col>
                    </Row>

                </Col>

            </Row>
        </>
    )
}

export default PayDataCard