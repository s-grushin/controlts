import { Card, Row, Col } from 'react-bootstrap'
import { Check2 } from 'react-bootstrap-icons'
import AllowOutgoModal from './AllowOutgoModal/AllowOutgoModal'
import { formatDate } from '../../../../utils/common'
import { useSelector } from 'react-redux'
import { getSelectedItem } from '../../../../redux/slices/vehicleMovesSlice'

const Inspector = () => {

  const outgo = useSelector(state => state.vehicleMoveOutgo)
  const vehicleMove = getSelectedItem(useSelector(state => state.vehicleMoves)) 

  return (
    <Card style={{ fontSize: 13 }} className='p-2 mt-2'>
      <Row>
        <Col>
          <Row>
            <Col className="fw-bold" xs='4'>ФИО Инспектора:</Col>
            <Col>{outgo?.data?.user?.fullName}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>№ ГТД:</Col>
            <Col>{outgo?.data?.cdn}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>Дата:</Col>
            <Col>{formatDate(outgo?.data?.date)}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>Вес на въезде:</Col>
            <Col>{vehicleMove?.weightIn}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>Вес на выезде:</Col>
            <Col>{vehicleMove?.weightOut}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>Выезд разрешен:</Col>
            <Col>
              {
                outgo?.data?.outgoAllowed && <Check2 style={{ color: 'green' }} size='30' />
              }
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <AllowOutgoModal />
            </Col>
          </Row>

        </Col>

      </Row>

    </Card>
  )
}

export default Inspector