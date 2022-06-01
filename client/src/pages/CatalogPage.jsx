import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup } from 'react-bootstrap'
import CatalogRouter from '../components/Catalog/CatalogRouter'

const CatalogPage = () => {

    const menuItems = [
        { id: 1, name: 'services', path: '/catalog/services', title: 'Услуги' },
        { id: 2, name: 'companies', path: '/catalog/companies', title: 'Компании' },
        { id: 3, name: 'vehicles', path: '/catalog/vehicles', title: 'Марки и модели авто' },
        { id: 4, name: 'parkings', path: '/catalog/parkings', title: 'Места стоянки' },
        { id: 5, name: 'shippingTypes', path: '/catalog/shippingTypes', title: 'Виды доставок' },
        { id: 6, name: 'users', path: '/catalog/users', title: 'Пользователи' },
    ]

    const [selectedItem, setSelectedItem] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()

    const clickMenuItemHandler = (id) => {
        const selectedItem = menuItems.find(item => item.id === id)
        setSelectedItem(selectedItem)
        navigate(selectedItem.path)
    }


    return (
        <div>
            <Row className='mt-1'>
                <h5 className='d-flex justify-content-end'>Справочники</h5>
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
                    <CatalogRouter />
                </Col>

            </Row>

        </div >
    )
}

export default CatalogPage