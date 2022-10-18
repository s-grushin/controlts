import { Alert } from 'react-bootstrap'

const AppAlert = ({ show, clear, title, text, variant }) => {

    if (!show) {
        return null
    }

    return (
        <Alert variant={variant} onClose={clear} dismissible>
            <Alert.Heading as='b'>{title}</Alert.Heading>
            <p>{text}</p>
        </Alert>
    )
}

AppAlert.defaultProps = {
    variant: 'danger',
    title: 'Ошибка'
}



export default AppAlert