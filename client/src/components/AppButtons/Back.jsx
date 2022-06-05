import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Back = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const clickHandler = () => {
        const path = location.pathname.split('/')
        path.shift()
        path.pop()
        const backPath = `/${path.join('/')}`
        navigate(backPath)
    }

    return (
        <Button
            variant='outline-secondary'
            size='sm'
            onClick={clickHandler}
        >Назад</Button>
    )
}

export default Back