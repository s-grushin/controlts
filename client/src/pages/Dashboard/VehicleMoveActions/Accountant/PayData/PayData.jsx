import { Row, Col } from 'react-bootstrap'
import { Check2 } from 'react-bootstrap-icons'
import SetPayModal from './SetPayModal/SetPayModal'
import { formatDate } from '../../../../../utils/common'
import { useSelector } from 'react-redux'

const PayData = () => {

    const vmPayData = useSelector(state => state.vehicleMovePayData)

    return (
        <>
            <Row style={{ fontSize: 13 }}>

                <Col lg='6'>
                    <Row>
                        <Col className="fw-bold">ФИО Бухгалтера:</Col>
                        <Col>{vmPayData?.payData?.user?.fullName}</Col>
                    </Row>

                    <Row className='mt-2'>
                        <Col>
                            <SetPayModal />
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </Col>

                <Col lg='6'>

                    <Row>
                        <Col className="fw-bold">Дата оплаты:</Col>
                        <Col>{formatDate(vmPayData?.payData?.paidDate)}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Статус оплаты:</Col>
                        <Col>
                            {
                                vmPayData?.payData?.isPaid ? <Check2 style={{ color: 'green' }} size='30' /> : ''
                            }
                        </Col>
                    </Row>

                </Col>

            </Row>
        </>
    )
}

export default PayData