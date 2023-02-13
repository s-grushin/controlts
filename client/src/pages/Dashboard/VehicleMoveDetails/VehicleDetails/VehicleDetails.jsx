import { useState, useEffect } from "react"
import { Col, Row, Stack, Table } from "react-bootstrap"
import VehiclePhoto from '../../../../components/VehiclePhoto'

const VehicleDetails = ({ vehicleDetails }) => {

    const [selectedId, setSelectedId] = useState(null)

    const detail = vehicleDetails.find(item => item.id === selectedId)

    useEffect(() => {

        if (vehicleDetails.length > 0) {
            setSelectedId(vehicleDetails[0].id)
        }

    }, [vehicleDetails])


    return (
        <Row className='gx-1'>
            <Col xl='6'>
                <Stack direction='vertical'>
                    <Table responsive bordered hover size='sm'>
                        <thead>
                            <tr>
                                <th>Гос знак</th>
                                <th>Тип</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vehicleDetails.map(item => (
                                    <tr
                                        key={item.id}
                                        onClick={() => setSelectedId(item.id)}
                                        className={item.id === selectedId ? 'selectedTableRow' : ''}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td>{item.number}</td>
                                        <td>{item.vehicleType.name}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Stack>
            </Col>
            <Col xl='6'>
                <VehiclePhoto
                    number={detail?.number}
                    photoUrl={detail?.photo}
                />
            </Col>
        </Row>
    )
}

VehicleDetails.defaultProps = {
    vehicleDetails: []
}

export default VehicleDetails