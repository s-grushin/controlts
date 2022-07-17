import React, { useState } from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import css from './Vehicles.module.css'

const Vehicles = () => {

    const [selectedBrandId, setSelectedBrandId] = useState(null)
    const [selectedModelId, setSelectedModelId] = useState(null)
    const [models, setModels] = useState([])

    const vehicles = [
        { id: '1', name: 'DAF', models: [{ id: 1, name: '1300 TURBO' }, { id: 2, name: 'XF 95.430' }] },
        { id: '2', name: 'IVECO', models: [{ id: 1, name: 'Trakker AD260T33B' }, { id: 2, name: 'EuroCargo 75E16' }] },
    ]

    const clickBrandHandler = (id) => {
        setSelectedBrandId(id)
    }

    return (
        <Row className={css.vehicles}>
            <Col md={3}>
                <ListGroup>
                    {
                        vehicles.map(item => (
                            <ListGroup.Item
                                className={`${css.brandItem} ${item.id === selectedBrandId ? 'selectedItem' : ''}`}
                                key={item.id}
                                onClick={() => clickBrandHandler(item.id)}
                            >

                                {item.name}
                            </ListGroup.Item>
                        ))
                    }

                </ListGroup>
            </Col>
            <Col md={9}>
                <>
                    123
                </>
            </Col>
        </Row >
    )
}

export default Vehicles