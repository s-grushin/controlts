import React, { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { STORAGE_KEYS } from '../constants/appConstants'

const CatalogPage = () => {

    const menuItems = [
        { id: 1, name: 'users', path: '/catalog/users', title: 'Пользователи' },
        { id: 2, name: 'services', path: '/catalog/services', title: 'Услуги' },
        { id: 3, name: 'companies', path: '/catalog/companies', title: 'Компании' },
        { id: 4, name: 'vehicles', path: '/catalog/vehicleBrands', title: 'Марки и модели авто' },
        { id: 5, name: 'parkings', path: '/catalog/parkings', title: 'Места стоянки' },
        { id: 6, name: 'deliveryTypes', path: '/catalog/deliveryTypes', title: 'Виды доставок' },
        { id: 7, name: 'vehicleTypes', path: '/catalog/vehicleTypes', title: 'Типы автотранспорта' },
        { id: 8, name: 'cameras', path: '/catalog/cameras', title: 'Настройки камер' },
        { id: 9, name: 'moveRegistrationPhotoSettings', path: '/catalog/moveRegistrationPhotoSettings', title: 'Регистрация въездов' },
    ]

    const [selectedItem, setSelectedItem] = useState(null)

    const navigate = useNavigate()

    const clickMenuItemHandler = (id) => {
        localStorage.removeItem(STORAGE_KEYS.catalogSelectedRowId)
        localStorage.removeItem(STORAGE_KEYS.catalogPage)
        const selectedItem = menuItems.find(item => item.id === id)
        setSelectedItem(selectedItem)
        navigate(selectedItem.path)
    }


    return (
        <div>
            <Row className='mt-1'>
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
                    <Outlet />
                </Col>

            </Row>

        </div >
    )
}

export default CatalogPage