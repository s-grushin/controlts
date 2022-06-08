import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const SaveAndExit = ({ clickHandler, isSaving }) => {
    return (

        <Button variant="outline-primary" size='sm' onClick={clickHandler} disabled={isSaving}>
            {
                isSaving ?
                    <>
                        Сохраняется...
                        <Spinner animation="grow" variant="primary" size='sm' className='mx-2' />
                    </>
                    :
                    'Сохранить и выйти'
            }
        </Button>
    )
}

export default SaveAndExit