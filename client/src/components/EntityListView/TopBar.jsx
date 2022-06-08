import React, { useContext } from 'react'
import Context from './Context'
import Back from '../AppButtons/Back'
import Add from '../AppButtons/Add'


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

    return (
        <div className='mb-2'>
            <Back />
            <span className='ms-2'>
                <Add clickHandler={context.topBar.handlers.addEntity} />
            </span>
        </div>
    )
}

export default TopBar