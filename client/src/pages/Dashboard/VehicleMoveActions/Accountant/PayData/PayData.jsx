import { Row, Col } from 'react-bootstrap'
import { Check2 } from 'react-bootstrap-icons'
import SetPayModal from './SetPayModal/SetPayModal'
import useVehicleMovesContext from '../../../VehicleMovesList/hooks/useVehicleMovesContext'
import { formatDate } from '../../../../../utils/common'

const PayData = () => {

    const { contextValue } = useVehicleMovesContext()
    const accountant = contextValue.state.items.find(item => item.id === contextValue.state.selectedId)?.accountant

    return (
        <>
            <Row style={{ fontSize: 13 }}>

                <Col lg='6'>
                    <Row>
                        <Col className="fw-bold">ФИО Бухгалтера:</Col>
                        <Col>{accountant?.user?.fullName}</Col>
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
                        <Col>{formatDate(accountant?.paidDate)}</Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="fw-bold">Статус оплаты:</Col>
                        <Col>
                            {
                                accountant?.isPaid ? <Check2 style={{ color: 'green' }} size='30' /> : ''
                            }
                        </Col>
                    </Row>

                </Col>

            </Row>
        </>
    )
}

export default PayData