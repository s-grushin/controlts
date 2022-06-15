import React from 'react'
import Confirmation from '../../Modals/Confirmation'
import { useContext } from 'react'
import Context from '../Context'

const DeleteEntityModal = () => {

    const context = useContext(Context)
    const selectedEntities = context.state.selectedEntities
    const entity = selectedEntities.length > 0 ? selectedEntities[0] : null
    const entityTitle = entity !== null ? entity[context.titlePropName] : ''

    function confirm() {
        context.handlers.deleteEntity('confirm')
    }

    function cancel() {
        context.handlers.deleteEntity('cancel')
    }

    return (
        <Confirmation
            title='Подтвердите удаление'
            show={context.modals.delete.show}
            confirmHandler={confirm}
            cancelHandler={cancel}
            isConfirming={context.modals.delete.isDeleting}
            error={context.modals.delete.error}
        >
            Удалить <b>{entityTitle}</b> ?
        </Confirmation>
    )
}

export default DeleteEntityModal