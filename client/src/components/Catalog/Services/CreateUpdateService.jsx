import { useState, useMemo } from 'react'
import { Card, Form } from 'react-bootstrap'
import CreateUpdateItem from '../../Item/CreateUpdateItem'
import useInputChange from '../../../hooks/useInputChange'

const CreateUpdateService = ({ variant }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const inputChangeHandler = useInputChange()

    const updateOptions = useMemo(() => [
        { field: 'name', setState: setName },
        { field: 'price', setState: setPrice },
    ], [])

    return (
        <CreateUpdateItem
            variant={variant}
            fetchUrl='/services'
            data={{ name, price }}
            updateOptions={updateOptions}
        >
            <Card className='mt-2'>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Наименование услуги</Form.Label>
                            <Form.Control size='sm' type="text" onChange={e => inputChangeHandler(e, setName)}
                                placeholder="Наименование услуги"
                                name="name"
                                value={name} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control size='sm' type="number" onChange={e => inputChangeHandler(e, setPrice)}
                                placeholder="Цена"
                                name="price"
                                value={price} />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </CreateUpdateItem>
    )
}

export default CreateUpdateService