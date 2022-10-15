import React, { useContext } from 'react'
import Context from './Context'
import Button from '../Button'

const BottomBar = () => {

    const context = useContext(Context)

    return (
        <div className='d-flex justify-content-end mt-2'>
            <Button isSaving={context.state.isSaving} clickHandler={context.handlers.saveAndCloseHandler} title='Сохранить и выйти' />
        </div>
    )
}

export default BottomBar