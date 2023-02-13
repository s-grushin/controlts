import React from 'react'
import { Modal } from 'react-bootstrap'
import Button from '../Button'


const Confirmation = ({ children, title, show, confirmHandler, cancelHandler, isConfirming, ...modalProps }) => {

    return (
        <Modal
            show={show}
            backdrop="static"
            onHide={() => cancelHandler()}
            {...modalProps}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button clickHandler={cancelHandler} title='Отмена' />
                <Button clickHandler={confirmHandler} title='Подтвердить' withSpinner={true} loading={isConfirming} autoFocus />
            </Modal.Footer>
        </Modal>
    )
}

export default Confirmation