import React from 'react'
import { Button } from 'react-bootstrap'

const Cancel = ({ clickHandler }) => {
    return (
        <Button variant="secondary" size='sm' onClick={clickHandler}>Отмена</Button>
    )
}

export default Cancel