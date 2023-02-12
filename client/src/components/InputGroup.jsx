import { FormControl, InputGroup as BInputGroup } from "react-bootstrap"

const InputGroup = ({ title, value, readOnly, onChange, options, name, ...props }) => {
    return (
        <BInputGroup size="sm" {...props}>
            <BInputGroup.Text
                id="inputGroup-sizing-sm"
                style={{ fontSize: options.titleFontSize }}
            >
                {title}
            </BInputGroup.Text>

            <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                readOnly={readOnly}
                value={value}
                style={{ fontWeight: 'bold' }}
                as={options.as}
                onChange={onChange}
                name={name}
            />
        </BInputGroup>
    )
}

InputGroup.defaultProps = {
    options: {
        titleFontSize: 12,
        as: 'input' //possible values: 'textarea'
    },
    readOnly: true
}

export default InputGroup