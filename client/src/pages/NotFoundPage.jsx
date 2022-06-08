import React from 'react'
import { Alert } from 'react-bootstrap'

const NotFoundPage = () => {
    return (
        <div className='mt-2'>
            <Alert variant='danger'>
                <b>Не найдено</b>
            </Alert>
        </div>
    )
}

export default NotFoundPage