import { useState, useMemo } from 'react'
import { Card, Form } from 'react-bootstrap'
import CreateUpdateItem from 'components/Item/CreateUpdateItem'
import useInputChange from 'hooks/useInputChange'
import SelectVehicleType from 'features/Select/SelectVehicleType'
import SelectCamera from 'features/Select/SelectCamera'


const CreateUpdateMoveRegistrationPhotoSettings = ({ variant }) => {

    const [cameraId, setCameraId] = useState('')
    const [vehicleTypeId, setVehicleTypeId] = useState('')
    const [order, setOrder] = useState('')

    const inputChangeHandler = useInputChange()

    const updateOptions = useMemo(() => [
        { field: 'cameraId', setState: setCameraId },
        { field: 'vehicleTypeId', setState: setVehicleTypeId },
        { field: 'order', setState: setOrder },
    ], [])

    return (
        <CreateUpdateItem
            variant={variant}
            fetchUrl='/moveRegistrationPhotoSettings'
            data={{ cameraId, vehicleTypeId, order }}
            updateOptions={updateOptions}
        >
            <Card className='mt-2'>
                <Card.Body>

                    <SelectCamera value={cameraId} onChange={setCameraId} />

                    <SelectVehicleType value={vehicleTypeId} onChange={setVehicleTypeId} />

                    <Form.Group className="mb-3">
                        <Form.Label>Сортировка</Form.Label>
                        <Form.Control size='sm' type='number'
                            onChange={e => inputChangeHandler(e, setOrder)}
                            placeholder="Сортировка"
                            name="order"
                            value={order} />
                    </Form.Group>

                </Card.Body>
            </Card>
        </CreateUpdateItem>
    )
}

export default CreateUpdateMoveRegistrationPhotoSettings