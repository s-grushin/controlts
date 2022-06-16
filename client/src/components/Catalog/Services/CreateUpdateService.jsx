import React from 'react'
import { Card, Form } from 'react-bootstrap'
import useCreateUpdate from '../../../hooks/useCreateUpdate'
import useInputChange from '../../../hooks/useInputChange'
import { create, update, getOne } from '../../../api/backend/serviceApi'
import Entity from '../../Entity/Entity'

const CreateUpdateService = ({ isUpdateMode }) => {

    const initState = { name: '', price: '' }

    const [formData, setFormData, isLoading, saveAndCloseHandler, isSaving, error]
        = useCreateUpdate(initState, isUpdateMode, create, update, getOne)

    const [inputChangeHandler] = useInputChange(formData, setFormData)

    const createContext = () => {
        return {
            state: {
                isLoading,
                isSaving,
                error,
            },
            handlers: {
                saveAndCloseHandler
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
                                <Form.Control size='sm' type="text" onChange={inputChangeHandler}
                                    placeholder="Наименование услуги"
                                    name="name"
                                    value={formData.name} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Цена</Form.Label>
                                <Form.Control size='sm' type="number" onChange={inputChangeHandler}
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

export default CreateUpdateService