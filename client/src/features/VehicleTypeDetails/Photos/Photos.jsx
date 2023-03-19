import { Col, Row } from 'react-bootstrap'
import { useVehicleTypeDetailsState } from 'features/VehicleTypeDetails/ContextProvider'
import VehiclePhotoContainer from 'components/VehiclePhoto/VehiclePhotoContainer'

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
                            <VehiclePhotoContainer
                                number={item.number}
                                moveDetailId={selectedItem.id}
                                isNew={item.isNew}
                                photoUrl={item.photoUrl}
                            />
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
                    <VehiclePhotoContainer
                        number={selectedItem.number}
                        moveDetailId={selectedItem.id}
                        isNew={selectedItem.isNew}
                        photoUrl={selectedItem.photoUrl}
                    />
                </Col>
            </Row>)
    }


}

Photos.defaultProps = {
    mode: 'selected' // 'selected', 'all'
}

export default Photos