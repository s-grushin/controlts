import { Toast, ToastContainer } from 'react-bootstrap'

const AppToast = ({ variant }) => {
    return (
        <ToastContainer className="p-3" position='bottom-end' >
            <Toast bg={variant}>
                <Toast.Header>
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

AppToast.defaultProps = {
    variant: 'success'
}

export default AppToast