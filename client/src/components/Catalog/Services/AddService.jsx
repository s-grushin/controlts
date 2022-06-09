import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form } from 'react-bootstrap'
import { useSaveData } from '../../../hooks/backend.hook'
import { create } from '../../../api/backend/serviceApi'
import Entity from '../../Entity/Entity'

const AddService = () => {

    const [createService, isSaving, isError, errorMessage] = useSaveData(create)
    const [formData, setFormData] = useState({ name: '', price: '' })
    const navigate = useNavigate()

    const saveAndExitHandler = async () => {
        const response = await createService(formData)
        if (response) {
            navigate(-1) 
        }
    }

    const inputHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const createContext = () => {
        return {
            state: {
                isSaving,
                isError,
                errorMessage
            },
            handlers: {
                saveAndExitHandler
            }
        }
    }

    return (
        <>
            < Entity context={createContext()} >
                <Card className='mt-2'>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Наименование услуги</Form.Label>
                                <Form.Control size='sm' type="text" onChange={inputHandler}
                                    placeholder="Наименование услуги"
                                    name="name"
                                    value={formData.name} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Цена</Form.Label>
                                <Form.Control size='sm' type="number" onChange={inputHandler}
                                    placeholder="Цена"
                                    name="price"
                                    value={formData.price} />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Entity >
        </>
    )

}

export default AddService