import { Card, Row, Col } from 'react-bootstrap'
import { Check2 } from 'react-bootstrap-icons'
import useVehicleMovesContext from '../../VehicleMovesList/hooks/useVehicleMovesContext'
import AllowOutgoModal from './AllowOutgoModal/AllowOutgoModal'
import { formatDate } from '../../../../utils/common'

const Inspector = () => {

  const { contextValue } = useVehicleMovesContext()
  const vehicleMoveId = contextValue.state.selectedId
  const vehicleMove = contextValue.state.items.find(item => item.id === vehicleMoveId)
  const inspector = vehicleMove?.inspector


  return (
    <Card style={{ fontSize: 13 }} className='p-2 mt-2'>

      <Row>

        <Col>
          <Row>
            <Col className="fw-bold" xs='4'>ФИО Инспектора:</Col>
            <Col>{inspector?.user?.fullName}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>№ ГТД:</Col>
            <Col>{inspector?.cdn}</Col>
          </Row>

          <Row className="mt-3">
            <Col className="fw-bold" xs='4'>Дата:</Col>
            <Col>{formatDate(inspector?.date)}</Col>
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
                inspector?.outgoAllowed && <Check2 style={{ color: 'green' }} size='30' />
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