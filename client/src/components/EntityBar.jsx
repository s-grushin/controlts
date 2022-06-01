import React from 'react'
import { Button } from 'react-bootstrap'

const EntityBar = ({ saveHandler, backHandler }) => {
    return (
        <>
            <Button variant="outline-primary" size='sm' onClick={saveHandler}>Сохранить и выйти</Button>
            <Button variant="outline-primary" size='sm' className='mx-2' onClick={backHandler}>Назад</Button>
        </>
    )
}

export default EntityBar