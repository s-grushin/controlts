import React, { useContext } from 'react'
import Context from './Context'
import SaveAndExit from '../AppButtons/SaveAndExit'

const BottomBar = () => {

    const context = useContext(Context)

    return (
        <div className='d-flex justify-content-end mt-2'>
            <SaveAndExit isSaving={context.state.isSaving} clickHandler={context.handlers.saveAndExitHandler} />
        </div>
    )
}

export default BottomBar