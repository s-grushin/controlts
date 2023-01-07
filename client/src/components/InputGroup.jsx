import { FormControl, InputGroup as BInputGroup } from "react-bootstrap"

const InputGroup = ({ title, value, options, ...props }) => {
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
                readOnly value={value}
                style={{ fontWeight: 'bold' }}
                as={options.as}
            />
        </BInputGroup>
    )
}

InputGroup.defaultProps = {
    options: {
        titleFontSize: 12,
        as: 'input' //possible values: 'textarea'
    }
}

export default InputGroup