import React, { useContext } from 'react'
import Context from './Context'
import Back from '../AppButtons/Back'
import Add from '../AppButtons/Add'
import Delete from '../AppButtons/Delete'


const TopBar = () => {

    /* const setDisabled = (action) => {

        const isAnyEntitySelected = state.selectedEntities[0].length > 0 || false
        console.log(isAnyEntitySelected);

        if (action.name === 'delete' && !isAnyEntitySelected) {
            return true
        }

        return false

    } */
    const context = useContext(Context)
    const [selectedEntities] = context.state.selectedEntities

    return (
        <div className='mb-2'>
            <Back />
            <span className='ms-2'>
                <Add clickHandler={context.topBar.handlers.addEntity} />
            </span>
            <span className='ms-2'>
                <Delete clickHandler={context.topBar.handlers.deleteEntity}
                    disabled={selectedEntities.length === 0} />
            </span>

        </div>
    )
}

export default TopBar