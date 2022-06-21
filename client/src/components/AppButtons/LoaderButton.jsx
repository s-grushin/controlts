import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const LoaderButton = ({ variant, text, loadingText, clickHandler, isLoading }) => {
    return (
        <Button variant={variant} size='sm' onClick={clickHandler} disabled={isLoading}>
            {
                isLoading ?
                    <>
                        {loadingText}
                        <Spinner animation="grow" variant="primary" size='sm' className='mx-2' />
                    </>
                    :
                    <>
                        {text}
                    </>

            }
        </Button>
    )
}

LoaderButton.defaultProps = {
    variant: "outline-primary",
    text: 'Сохранить и выйти',
    loadingText: 'Подождите...',
}

export default LoaderButton