import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'

const EntityBar = ({ saveHandler, backHandler, isSaving }) => {

    return (
        <>
            <Button variant="outline-primary" size='sm' onClick={saveHandler} disabled={isSaving}>
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
            <Button variant="outline-primary" size='sm' className='mx-2' onClick={backHandler}>Назад</Button>

        </>
    )
}

export default EntityBar