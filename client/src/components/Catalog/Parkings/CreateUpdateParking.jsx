import { useState, useMemo } from 'react'
import { Card, Form } from 'react-bootstrap'
import CreateUpdateItem from '../../Item/CreateUpdateItem'
import useInputChange from '../../../hooks/useInputChange'

const CreateUpdateParking = ({ variant }) => {

    const [name, setName] = useState('')
    const [isBusy, setIsBusy] = useState(false)

    const inputChangeHandler = useInputChange()

    const updateOptions = useMemo(() => [
        { field: 'name', setState: setName },
        { field: 'isBusy', setState: setIsBusy },
    ], [])

    return (
        <CreateUpdateItem
            variant={variant}
            fetchUrl='/parkings'
            data={{ name, isBusy }}
            updateOptions={updateOptions}
        >
            <Card className='mt-2'>
                <Card.Body>
                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label>Наименование места стоянки</Form.Label>
                            <Form.Control size='sm' type="text" onChange={e => inputChangeHandler(e, setName)}
                                placeholder="Наименование места стоянки"
                                name="name"
                                value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check label='Занято' name='isBusy'
                                defaultChecked={isBusy}
                                onChange={e => inputChangeHandler(e, setIsBusy)}
                            />
                        </Form.Group>

                    </Form>
                </Card.Body>
            </Card>
        </CreateUpdateItem>
    )
}

export default CreateUpdateParking