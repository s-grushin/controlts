import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const Confirm = ({ clickHandler, isConfirming }) => {
    return (

        <Button variant="outline-primary" size='sm' onClick={clickHandler} disabled={isConfirming}>
            {
                isConfirming ?
                    <>
                        Подождите...
                        <Spinner animation="grow" variant="primary" size='sm' className='mx-2' />
                    </>
                    :
                    'Подтвердить'

            }
        </Button>
    )
}

Confirm.defaultProps = {
    disabled: false
}

export default Confirm