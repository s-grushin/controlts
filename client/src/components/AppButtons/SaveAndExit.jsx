import React from 'react'
import { Button } from 'react-bootstrap'

const SaveAndExit = ({ clickHandler }) => {
    return (
        <Button
            variant='outline-primary'
            size='sm'
            onClick={clickHandler}
        >Сохранить и выйти</Button>
    )
}

export default SaveAndExit