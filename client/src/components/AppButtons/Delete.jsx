import React from 'react'
import { Button } from 'react-bootstrap'

const Delete = ({ clickHandler, disabled }) => {
    return (
        <Button variant="outline-danger"
            size='sm'
            onClick={clickHandler}
            disabled={disabled}
        >
            Удалить
        </Button>
    )
}

export default Delete