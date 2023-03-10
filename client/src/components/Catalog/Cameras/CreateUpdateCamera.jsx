import { useState, useMemo } from 'react'
import { Card, Form } from 'react-bootstrap'
import CreateUpdateItem from 'components/Item/CreateUpdateItem'
import useInputChange from 'hooks/useInputChange'

const CreateUpdateCamera = ({ variant }) => {

    const [name, setName] = useState('')
    const [photosPath, setPhotosPath] = useState('')

    const inputChangeHandler = useInputChange()

    const updateOptions = useMemo(() => [
        { field: 'name', setState: setName },
        { field: 'photosPath', setState: setPhotosPath },
    ], [])

    return (
        <CreateUpdateItem
            variant={variant}
            fetchUrl='/cameras'
            data={{ name, photosPath }}
            updateOptions={updateOptions}
        >
            <Card className='mt-2'>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Наименование камеры</Form.Label>
                            <Form.Control size='sm' type="text" onChange={e => inputChangeHandler(e, setName)}
                                placeholder="Наименование камеры"
                                name="name"
                                value={name} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Путь к фотографиям (на сервере). Например: C:\nomerok\photos\фото тягача</Form.Label>
                            <Form.Control size='sm' onChange={e => inputChangeHandler(e, setPhotosPath)}
                                placeholder="Путь к фотографиям (на сервере)"
                                name="photosPath"
                                value={photosPath} />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </CreateUpdateItem>
    )
}

export default CreateUpdateCamera