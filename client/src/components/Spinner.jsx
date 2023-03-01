import { Spinner as BootstrapSpinner } from 'react-bootstrap'

const Spinner = ({ animation, variant, ...props }) => {
    return (
        <BootstrapSpinner animation={animation} variant={variant} {...props} />
    )
}

Spinner.defaultProps = {
    animation: "border",
    variant: "primary",
}

export default Spinner