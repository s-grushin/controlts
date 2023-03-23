import InputError from "components/InputError"
import { Form } from "react-bootstrap"
import { useGetVehicleTypesQuery } from "redux/api/vehicleTypesApi"


const SelectVehicleType = ({ value, onChange, ...props }) => {

    const { data, isFetching, isError, error } = useGetVehicleTypesQuery()

    return (
        <Form.Group {...props}>
            <Form.Label>Тип автотранспорта</Form.Label>
            <Form.Select
                size='sm'
                disabled={isFetching || isError || !value}
                onChange={(e) => onChange(e.target.value)}
                value={value}
            >
                <option>--Выбрать тип автотранспорта--</option>
                {data?.rows.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </Form.Select>
            {isError && <InputError errorText={`Ошибка загрузки типов транспорта: ${JSON.stringify(error)}`} />}
        </Form.Group>
    )
}

export default SelectVehicleType