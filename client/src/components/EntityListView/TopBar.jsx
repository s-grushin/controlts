import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from './Context'
import Button from '../Button'

const TopBar = () => {

    const navigate = useNavigate()

    /* const setDisabled = (action) => {

        const isAnyEntitySelected = state.selectedEntities[0].length > 0 || false
        console.log(isAnyEntitySelected);

        if (action.name === 'delete' && !isAnyEntitySelected) {
            return true
        }

        return false

    } */
    const context = useContext(Context)
    const selectedEntities = context.state.selectedEntities

    return (
        <div className='mb-2'>
            <Button title='Назад' clickHandler={navigate('/')} />
            <span className='ms-2'>
                <Button clickHandler={context.handlers.addEntity} title='Добавить' />
            </span>
            <span className='ms-2'>
                <Button clickHandler={() => context.handlers.deleteEntity('showModal')}
                    disabled={selectedEntities.length === 0} title='Удалить' />
            </span>

        </div>
    )
}

export default TopBar