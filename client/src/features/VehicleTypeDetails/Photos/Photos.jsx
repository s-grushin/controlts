import { Col, Row } from 'react-bootstrap'
import VehiclePhoto from 'components/VehiclePhoto'
import { useVehicleTypeDetailsState } from 'features/VehicleTypeDetails/ContextProvider'

const Photos = ({ mode }) => {

    const { state } = useVehicleTypeDetailsState()
    const selectedItem = state.items.find(item => item.id === state.selectedId)

    if (!selectedItem && mode === 'selected') {
        return null
    }

    if (mode === 'all') {
        return (
            <Row className='gx-1'>
                {
                    state.items.map(item =>
                        <Col key={item.id} lg='6'>
                            <VehiclePhoto number={item.number} photoUrl={item.photo} />
                        </Col>
                    )
                }
            </Row>
        )
    }


    if (mode === 'selected') {
        return (
            <Row>
                <Col>
                    <VehiclePhoto number={selectedItem.number} photoUrl={selectedItem.photo} />
                </Col>
            </Row>)
    }


}

Photos.defaultProps = {
    mode: 'selected' // 'selected', 'all'
}

export default Photos