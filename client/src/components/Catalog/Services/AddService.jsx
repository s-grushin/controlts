import React, { useState } from 'react'
import { Card, Form, FloatingLabel } from 'react-bootstrap'
import { useSaveData } from '../../../hooks/backend.hook'
import Entity from '../../Entity/Entity'

const AddService = () => {

    const [saveData, isSaving, isError, errorMessage] = useSaveData({ test: '' })
    const [formData, setFormData] = useState({ name: '', price: '' })

    const saveAndExitHandler = async () => {
        //await saveData()
        console.log(formData);
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
                isSaving
            },
            handlers: {
                saveAndExitHandler
            }
        }
    }

    return (
        <Entity context={createContext()}>
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
        </Entity>
    )

}

export default AddService