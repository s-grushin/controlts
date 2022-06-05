import React from 'react'
import { Card, Form } from 'react-bootstrap'
import SaveAndExit from '../../AppButtons/SaveAndExit'
import Back from '../../AppButtons/Back'

const AddService = () => {

    const saveAndExitHandler = () => {
        console.log('saveAndExitHandler');
    }

    return (
        <>
            <div>
                <Back />
            </div>
            <Card className='mt-2'>
                <Card.Body>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Наименование услуги</Form.Label>
                            <Form.Control size='sm' type="text" placeholder="Наименование услуги" />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <div className='d-flex justify-content-end mt-2'>
                <SaveAndExit clickHandler={saveAndExitHandler} />
            </div>
        </>
    )
}

export default AddService