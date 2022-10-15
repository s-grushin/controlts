import { Modal } from 'react-bootstrap'
import Button from '../components/Button'

const ConfirmModal = ({ children, show, title, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} keyboard={true}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" title='Отмена' clickHandler={() => handleClose('cancel')} />
                <Button variant="outline-primary" title='ОК' clickHandler={() => handleClose('ok')} />
            </Modal.Footer>
        </Modal>
    )
}

ConfirmModal.defaultProps = {
    title: 'Подтверждение'
}

export default ConfirmModal