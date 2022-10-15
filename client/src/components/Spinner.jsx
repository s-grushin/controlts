import { Spinner as BootstrapSpinner } from 'react-bootstrap'

const Spinner = ({ animation, variant }) => {
    return (
        <BootstrapSpinner animation={animation} variant={variant} />
    )
}

Spinner.defaultProps = {
    animation: "border",
    variant: "primary",
}

export default Spinner