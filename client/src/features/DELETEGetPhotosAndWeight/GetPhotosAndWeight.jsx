import { Col, Row } from 'react-bootstrap'
import PhotosAndWeightProvider from './context/PhotosAndWeightProvider'
import Table from './Table'

const GetPhotosAndWeight = ({ vehicleMove }) => {

    return (
        <PhotosAndWeightProvider vehicleMove={vehicleMove}>
            <Row>
                <Col>
                    <Table />
                </Col>

                <Col>

                </Col>
            </Row>
        </PhotosAndWeightProvider>
    )
}

export default GetPhotosAndWeight