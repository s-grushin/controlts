import React from 'react'
import { Card, Form } from 'react-bootstrap'
import useCreateUpdate from '../../../hooks/useCreateUpdate'
import useInputChange from '../../../hooks/useInputChange'
import { create, update, getOne } from '../../../api/backend/parkingsApi'
import Entity from '../../Entity/Entity'

const CreateUpdateParking = ({ isUpdateMode }) => {

    const initState = { name: '', isBusy: '', number: '' }

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
                                <Form.Label>Наименование места стоянки</Form.Label>
                                <Form.Control size='sm' type="text" onChange={inputChangeHandler}
                                    placeholder="Наименование места стоянки"
                                    name="name"
                                    value={formData.name} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Номер пропуска</Form.Label>
                                <Form.Control size='sm' type="text" onChange={inputChangeHandler}
                                    placeholder="Номер пропуска"
                                    name="number"
                                    value={formData.number} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Check label='Занято' name='isBusy'
                                    defaultChecked={formData.isBusy}
                                    onChange={inputChangeHandler}
                                />
                            </Form.Group>

                        </Form>
                    </Card.Body>
                </Card>
            </Entity >
        </>
    )

}

export default CreateUpdateParking