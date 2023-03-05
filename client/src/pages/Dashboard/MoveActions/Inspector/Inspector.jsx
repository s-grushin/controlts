import { Card, Row, Col } from 'react-bootstrap'
import { Check2 } from 'react-bootstrap-icons'
import { formatDate } from 'utils/common'
import useMovesHelper from 'pages/Dashboard/VehicleMovesList/hooks/useMovesHelper'
import MoveOutgoEdit from 'features/MoveOutgoEdit/MoveOutgoEdit'

const Inspector = () => {

  const { selectedMove } = useMovesHelper()

  return (
    <Card style={{ fontSize: 13 }} className='p-2 mt-2'>
      <Row>
        <Col>
          <Row>
            <Col className="fw-bold" xs='4'>ФИО Инспектора:</Col>
            <Col>{selectedMove?.outgo?.user?.fullName}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>№ ГТД:</Col>
            <Col>{selectedMove?.outgo?.cdn}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>Дата:</Col>
            <Col>{formatDate(selectedMove?.outgo?.date)}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>Вес на въезде:</Col>
            <Col>{selectedMove?.weightIn}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>Вес на выезде:</Col>
            <Col>{selectedMove?.weightOut}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>Выезд разрешен:</Col>
            <Col>
              {
                selectedMove?.outgo?.outgoAllowed && <Check2 style={{ color: 'green' }} size='30' />
              }
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              {!selectedMove?.dateOut && <MoveOutgoEdit move={selectedMove} />}
            </Col>
          </Row>

        </Col>

      </Row>

    </Card>
  )
}

export default Inspector