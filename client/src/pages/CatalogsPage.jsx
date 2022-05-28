import React, { useState } from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'

const CatalogsPage = () => {

    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'services', title: 'Услуги' },
        { id: 2, name: 'companies', title: 'Компании' },
        { id: 3, name: 'vehicles', title: 'Марки и модели авто' },
        { id: 4, name: 'parkings', title: 'Места стоянки' },
        { id: 5, name: 'shipping', title: 'Виды доставок' },
    ])

    const [selectedItem, setSelectedItem] = useState(null)

    const clickMenuItemHandler = (id) => {
        setSelectedItem(menuItems.find(item => item.id === id))
    }

    return (
        <div>
            <Row className='mt-1'>
                <h5 className='d-flex justify-content-center'>Справочники</h5>
                <Col md={3}>
                    <ListGroup>
                        {menuItems.map(item => (
                            <ListGroup.Item
                                key={item.id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => clickMenuItemHandler(item.id)}
                                active={selectedItem === null ? false : item.id === selectedItem.id ? true : false}
                            >{item.title}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col md={9}>
                    2
                </Col>

            </Row>

        </div >
    )
}

export default CatalogsPage