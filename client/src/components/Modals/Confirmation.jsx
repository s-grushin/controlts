import React from 'react'
import { Modal } from 'react-bootstrap'
import Button from '../Button'


const Confirmation = ({ children, title, show, confirmHandler, cancelHandler, isConfirming }) => {

    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button clickHandler={cancelHandler} title='Отмена' />
                <Button clickHandler={confirmHandler} title='Подтвердить' withSpinner={true} />
            </Modal.Footer>
        </Modal>
    )
}

export default Confirmation