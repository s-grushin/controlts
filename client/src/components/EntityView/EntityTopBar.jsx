import React from 'react'
import { Button } from 'react-bootstrap'

const EntityTopBar = ({ topBar, state }) => {

    const setDisabled = (item) => {

        const isAnyEntitySelected = state.selectedEntities[0].length > 0 || false
        console.log(isAnyEntitySelected);

        if (item.name === 'delete' && !isAnyEntitySelected) {
            return true
        }

        return false

    }

    return (
        <>
            {topBar.buttons.map(item =>
                <Button key={item.name}
                    variant={item.variant || "outline-secondary"}
                    size='sm'
                    className='me-2'
                    onClick={item.handler}
                    disabled={setDisabled(item)}
                >
                    {item.text}
                </Button>
            )}
        </>
    )
}

export default EntityTopBar