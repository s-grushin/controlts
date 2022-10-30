import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Form } from 'react-bootstrap'
import CreateUpdateItem from '../../Item/CreateUpdateItem'
import useInputChange from '../../../hooks/useInputChange'

const CreateUpdateVehicleModel = ({ variant }) => {

    const [brand, setBrand] = useState('')
    const [name, setName] = useState('')
    const [weight, setWeight] = useState('')
    const [isTruck, setIsTruck] = useState(false)

    const { brandId } = useParams()

    const inputChangeHandler = useInputChange()

    const updateOptions = useMemo(() => [
        { field: 'brand', setState: setBrand },
        { field: 'name', setState: setName },
        { field: 'weight', setState: setWeight },
        { field: 'isTruck', setState: setIsTruck },
    ], [])

    return (
        <CreateUpdateItem
            variant={variant}
            fetchUrl='/vehicle/models'
            data={{ brandId: brand.id, name, weight, isTruck }}
            updateOptions={updateOptions}
            oneSetter={setBrand}
            oneFetchUrl={`/vehicle/brands/${brandId}`}
        >
            <Card className='mt-2'>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Марка ТС</Form.Label>
                            <Form.Control size='sm' type="text"
                                placeholder="Наименование марки ТС"
                                name="brand"
                                value={brand.name}
                                disabled={true}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Наименование модели</Form.Label>
                            <Form.Control size='sm' type="text" onChange={e => inputChangeHandler(e, setName)}
                                placeholder="Наименование модели"
                                name="name"
                                value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Грузоподъемность</Form.Label>
                            <Form.Control size='sm' type="number" onChange={e => inputChangeHandler(e, setWeight)}
                                placeholder="Грузоподъемность"
                                name="weight"
                                value={weight} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check label='Грузовой' name='isTruck'
                                defaultChecked={isTruck}
                                onChange={e => inputChangeHandler(e, setIsTruck)}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </CreateUpdateItem>
    )
}

export default CreateUpdateVehicleModel