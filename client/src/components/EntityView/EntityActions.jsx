import React from 'react'
import { Button } from 'react-bootstrap'

const EntityActions = ({ actions }) => {

    return (
        <>
            {actions.map(action =>
                <Button key={action.name}
                    variant="outline-secondary"
                    size='sm'
                    onClick={action.handler}
                >
                    {action.text}
                </Button>
            )}
        </>
    )
}

export default EntityActions