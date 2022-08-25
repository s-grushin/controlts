import React from 'react'
import { Button } from 'react-bootstrap'

const Add = ({ clickHandler, disabled }) => {
    return (
        <Button variant="outline-success"
            size='sm'
            onClick={clickHandler}
            disabled={disabled}
        >
            Добавить
        </Button>
    )
}

export default Add