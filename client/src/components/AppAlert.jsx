import { Alert } from 'react-bootstrap'

const AppAlert = ({ show, clear, title, text, variant }) => {

    if (!show) {
        return null
    }

    return (
        <Alert variant={variant} onClose={clear} dismissible>
            <Alert.Heading>{title}</Alert.Heading>
            <p>
                {text}
            </p>
        </Alert>
    )
}

AppAlert.defaultProps = {
    variant: 'danger'
}



export default AppAlert