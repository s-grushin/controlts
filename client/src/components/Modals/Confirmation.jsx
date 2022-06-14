import React from 'react'
import { Modal } from 'react-bootstrap'
import Confirm from '../AppButtons/Confirm'
import Cancel from '../AppButtons/Cancel'
import AppError from '../AppError'


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
                <Cancel clickHandler={cancelHandler} />
                <Confirm clickHandler={confirmHandler} isConfirming={isConfirming} />
            </Modal.Footer>
        </Modal>
    )
}

export default Confirmation