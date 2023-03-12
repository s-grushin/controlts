import React from 'react'
import { Form } from 'react-bootstrap'

const Checkbox = ({ value, onChange, labelText, hintText }) => {
    return (
        <Form.Group>
            <Form.Check label={labelText}
                defaultChecked={value}
                onChange={(e) => onChange(e.target.checked)}
                id='checkboxId'
            />

            {hintText && <Form.Text className="text-muted">
                снять галку если необходимо отключить пользователя
            </Form.Text>}

        </Form.Group>

    )
}

export default Checkbox