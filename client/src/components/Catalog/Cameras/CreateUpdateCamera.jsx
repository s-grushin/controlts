import { useState, useMemo } from 'react'
import { Card, Form } from 'react-bootstrap'
import CreateUpdateItem from 'components/Item/CreateUpdateItem'
import useInputChange from 'hooks/useInputChange'

const CreateUpdateCamera = ({ variant }) => {

    const [name, setName] = useState('')
    const [photoPath, setPhotoPath] = useState('')

    const inputChangeHandler = useInputChange()

    const updateOptions = useMemo(() => [
        { field: 'name', setState: setName },
        { field: 'photoPath', setState: setPhotoPath },
    ], [])

    return (
        <CreateUpdateItem
            variant={variant}
            fetchUrl='/cameras'
            data={{ name, photoPath }}
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
                            <Form.Label>Путь к фотографиям (на сервере). Например: C:\nomerok\photos</Form.Label>
                            <Form.Control size='sm' onChange={e => inputChangeHandler(e, setPhotoPath)}
                                placeholder="Путь к фотографиям (на сервере)"
                                name="photoPath"
                                value={photoPath} />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </CreateUpdateItem>
    )
}

export default CreateUpdateCamera