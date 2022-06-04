import React from 'react'
import { Button } from 'react-bootstrap'

const EntityTopBar = ({ topBar }) => {

    return (
        <>
            {topBar.map(item =>
                <Button key={item.name}
                    variant="outline-secondary"
                    size='sm'
                    className='me-2'
                    onClick={item.handler}
                >
                    {item.text}
                </Button>
            )}
        </>
    )
}

export default EntityTopBar