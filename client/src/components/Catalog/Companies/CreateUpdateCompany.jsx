import React, { useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import useCreateUpdate from '../../../hooks/useCreateUpdate'
import useInputChange from '../../../hooks/useInputChange'
import { create, update, getOne } from '../../../api/backend/companyApi'
import Entity from '../../Entity/Entity'

const CreateUpdateCompany = ({ isUpdateMode }) => {

    const initState = { name: '', edrpou: '', inn: '' }

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
                                <Form.Label>Наименование компании</Form.Label>
                                <Form.Control size='sm' type="text"
                                    onChange={inputChangeHandler}
                                    placeholder="Наименование компании"
                                    name="name"
                                    value={formData.name} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>ЕДРПОУ</Form.Label>
                                <Form.Control size='sm' type="text" onChange={inputChangeHandler}
                                    placeholder="ЕДРПОУ"
                                    name="edrpou"
                                    value={formData.edrpou || ''} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>ИНН</Form.Label>
                                <Form.Control size='sm' type="text" onChange={inputChangeHandler}
                                    placeholder="ИНН"
                                    name="inn"
                                    value={formData.inn || ''} />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Entity >
        </>
    )

}

export default CreateUpdateCompany