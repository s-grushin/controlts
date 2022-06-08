import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import Back from '../../AppButtons/Back'


const EntityTopBar = () => {

    /* const setDisabled = (action) => {

        const isAnyEntitySelected = state.selectedEntities[0].length > 0 || false
        console.log(isAnyEntitySelected);

        if (action.name === 'delete' && !isAnyEntitySelected) {
            return true
        }

        return false

    } */

    const options = useContext()

    return (
        <>
            <Back />
            {options.actions.map(action =>
                <Button key={action.name}
                    variant={action.variant || "outline-secondary"}
                    size='sm'
                    className='me-2'
                    onClick={action.handler}
                >
                    {action.text}
                </Button>
            )}
        </>
    )
}


EntityTopBar.defaultProps = {
    options: {
        actions: []
    },
    state: {}
}

export default EntityTopBar