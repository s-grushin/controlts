import { Alert } from 'react-bootstrap'

const AppAlert = ({ show, clear, title, text, variant, props }) => {

    if (!show) {
        return null
    }

    return (
        <Alert variant={variant} onClose={clear} dismissible {...props}>
            <Alert.Heading as='b'>{title}</Alert.Heading>
            <div>{text}</div>
        </Alert>
    )
}

AppAlert.defaultProps = {
    variant: 'danger',
    title: 'Ошибка',
    text: '',
}



export default AppAlert