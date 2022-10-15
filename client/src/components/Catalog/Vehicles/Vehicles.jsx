import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner, Table } from 'react-bootstrap'
import { getAll, deleteBrand } from '../../../api/backend/vehiclesApi'
import { Row, Col, ListGroup } from 'react-bootstrap'
import css from './Vehicles.module.css'
import useHttp from '../../../hooks/useHttp'
import Button from '../../Button'
import Confirmation from '../../Modals/Confirmation'

const Vehicles = () => {

    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const { request, loading, error } = useHttp()
    const [selectedBrandId, setSelectedBrandId] = useState(null)
    const [selectedModelId, setSelectedModelId] = useState(null)
    const [showModal, setShowModal] = useState(false)


    const navigate = useNavigate()

    const clickBrandHandler = (id) => {
        const brand = brands.find(item => item.id === id)
        setSelectedBrandId(id)
        setModels(brand.models)
        setSelectedModelId(null)
    }

    const doubleClickBrandHandler = (id) => {
        navigate(`/catalog/vehicles/brands/${id}`)
    }

    const doubleClickModelHandler = (id) => {
        navigate(`/catalog/vehicles/models/${id}`)
    }

    const clickModelHandler = (id) => {
        setSelectedModelId(id)
    }

    const createBrandHandler = () => {
        navigate(`/catalog/vehicles/brands/add`)
    }

    const createModelHandler = () => {
        navigate(`/catalog/vehicles/models/add?brandid=${selectedBrandId}`)
    }

    useEffect(() => {

        const getData = async () => {
            const data = await request(getAll)
            if (!error) {
                setBrands(data)
            }
        }

        getData()

    }, [])

    const deleteBrandHandler = () => {
        setShowModal(true)
    }

    const deleteBrandConfirmHandler = async () => {
        await request(() => deleteBrand(selectedBrandId))
        setShowModal(false)
        setBrands(brands.filter(item => item.id !== selectedBrandId))
        setSelectedBrandId(null)
        setModels([])
    }


    const deleteModel = () => {

    }

    const getBrandName = (brandId) => {
        const brand = brands.filter((item) => item.id === brandId)
        return brand.length > 0 ? brand[0].name : ''
    }

    return (
        <>
            {
                loading ?
                    <Spinner animation="border" variant="primary" />
                    :
                    error ? error :
                        <>
                            <Row className={css.vehicles}>
                                <Col md={3}>
                                    <div className='vstack gap-1'>
                                        <Button title='Назад' clickHandler={navigate('/')} />
                                        <b>Марки ТС</b>
                                        <Button clickHandler={createBrandHandler} title='Добавить' />
                                        <Button clickHandler={deleteBrandHandler} title='Удалить' disabled={selectedBrandId === null} />
                                    </div>
                                </Col>
                                <Col md={9}>

                                </Col>
                            </Row >

                            <Row>
                                <Col md={3}>
                                    <ListGroup className='my-2'>
                                        {
                                            brands.map(item => (
                                                <ListGroup.Item
                                                    className={`${css.brandItem} ${item.id === selectedBrandId ? 'selectedItem' : ''}`}
                                                    key={item.id}
                                                    onClick={() => clickBrandHandler(item.id)}
                                                    onDoubleClick={() => doubleClickBrandHandler(item.id)}
                                                >

                                                    {item.name}
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                </Col>
                                <Col md={9}>
                                    <b>Модели ТС</b>
                                    <div className='my-2'>
                                        <Button clickHandler={createModelHandler}
                                            disabled={selectedBrandId === null}
                                            title='Добавить'
                                        />
                                        <span className='ms-2'>
                                            <Button clickHandler={deleteModel} disabled={selectedModelId === null} title='Удалить' />
                                        </span>
                                    </div>
                                    < Table responsive bordered hover size='sm'>
                                        < thead >
                                            <tr>
                                                <th>№</th>
                                                <th>Наименование</th>
                                                <th>Вес</th>
                                                <th>Грузовой</th>
                                            </tr >
                                        </thead >
                                        <tbody>
                                            {
                                                models.map((item, index) =>

                                                    <tr
                                                        className={`${css.modelItem} ${item.id === selectedModelId ? 'selectedItem' : ''}`}
                                                        key={item.id}
                                                        onClick={() => clickModelHandler(item.id)}
                                                        onDoubleClick={() => doubleClickModelHandler(item.id)}
                                                    >
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.weight}</td>
                                                        <td>{item.isTruck === true ? 'ok' : false}</td>
                                                    </tr>
                                                )

                                            }
                                        </tbody>
                                    </Table >
                                </Col>
                            </Row>
                        </>
            }

            <Confirmation
                title='Подтвердите удаление'
                show={showModal}
                confirmHandler={deleteBrandConfirmHandler}
                cancelHandler={() => setShowModal(false)}
                isConfirming={loading}
                error=''
            >
                Удалить <b>{getBrandName(selectedBrandId)}</b> ? Все модели связанные с этой маркой будут также удалены
            </Confirmation>
        </>
    )
}

export default Vehicles