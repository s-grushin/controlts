import React from 'react'
import { Card, Form } from 'react-bootstrap'
import useCreateUpdate from '../../../hooks/useCreateUpdate'
import useInputChange from '../../../hooks/useInputChange'
import { create, update, getOne } from '../../../api/backend/deliveryTypesApi'
import Entity from '../../Entity/Entity'

const CreateUpdateDeliveryType = ({ isUpdateMode }) => {

    const initState = { name: '' }

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
                                <Form.Label>Наименование вида доставки</Form.Label>
                                <Form.Control size='sm' type="text" onChange={inputChangeHandler}
                                    placeholder="Наименование вида доставки"
                                    name="name"
                                    value={formData.name} />
                            </Form.Group>

                        </Form>
                    </Card.Body>
                </Card>
            </Entity >
        </>
    )

}

export default CreateUpdateDeliveryType