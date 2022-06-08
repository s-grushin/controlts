import React from 'react'
import { Button } from 'react-bootstrap'

const Add = ({ clickHandler }) => {
    return (
        <Button variant="outline-success"
            size='sm'
            onClick={clickHandler}
        >
            Добавить
        </Button>
    )
}

export default Add