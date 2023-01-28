import { Row, Col, Card, ListGroup } from 'react-bootstrap'
import { useState } from 'react'


const menu = [
    { id: 1, title: 'Персональные настройки' },
    { id: 2, title: 'Константы' },
    { id: 3, title: 'Прочее' },
]

const Settings = () => {

    const [selectedItemId, setSelectedItemId] = useState(null)

    return (
        <Row className='d-flex justify-content-center mt-1'>

            <Col md='4'>
                <ListGroup>
                    {
                        menu.map(item => (
                            <ListGroup.Item
                                key={item.id}
                                onClick={() => setSelectedItemId(item.id)}
                                active={item.id === selectedItemId}
                                style={{ cursor: 'pointer' }}
                            >
                                {item.title}
                            </ListGroup.Item>))
                    }
                </ListGroup>
            </Col>

            <Col md='8'>
                <Card className='mt-2'>
                    <Card.Body>


                    </Card.Body>
                </Card>
            </Col>

        </Row>
    )
}

export default Settings