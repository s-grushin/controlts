import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Back = () => {

    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(-1)
    }

    return (
        <Button
            variant='outline-secondary'
            size='sm'
            onClick={clickHandler}
        >
            Назад
        </Button>
    )
}

export default Back