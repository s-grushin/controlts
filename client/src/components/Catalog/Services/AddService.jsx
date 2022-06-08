import React from 'react'
import { Card, Form, FloatingLabel } from 'react-bootstrap'
import { useSaveData } from '../../../hooks/backend.hook'
import Entity from '../../Entity/Entity'

const AddService = () => {

    const [saveData, isSaving, isError, errorMessage] = useSaveData({ test: '' })

    const saveAndExitHandler = async () => {

        await saveData()

    }

    const Content = () => (<Card className='mt-2'>
        <Card.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Наименование услуги</Form.Label>
                    <Form.Control size='sm' type="text" placeholder="Наименование услуги" />
                </Form.Group>
            </Form>
        </Card.Body>
    </Card>)


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
        <Entity Content={Content} context={createContext()} />
    )

}

export default AddService