import InputError from "components/InputError"
import { Form } from "react-bootstrap"
import { useGetCamerasQuery } from "redux/api/camerasApi"


const SelectCamera = ({ value, onChange }) => {

    const { data, isFetching, isError, error } = useGetCamerasQuery()

    return (
        <Form.Group className="mb-3">
            <Form.Label>Камера</Form.Label>
            <Form.Select
                size='sm'
                disabled={isFetching || isError}
                onChange={(e) => onChange(e.target.value)}
                defaultValue={value}
            >
                <option>--Выбрать камеру--</option>
                {data?.rows.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </Form.Select>
            {isError && <InputError errorText={`Ошибка загрузки камер: ${JSON.stringify(error)}`} />}
        </Form.Group>
    )
}

export default SelectCamera