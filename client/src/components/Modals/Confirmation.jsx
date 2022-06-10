import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const Confirmation = ({ children, title, show, confirmHandler }) => {

    function closeHandle() {

    }

    function confirm() {

    }

    return (
        <Modal
            show={show}
            onHide={closeHandle}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeHandle}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={confirm}>Подтвердить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirmation