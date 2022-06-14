import React, { useState } from 'react'
import Confirmation from '../../Modals/Confirmation'
import { useContext } from 'react'
import Context from '../Context'
import useDelete from '../../../hooks/useDelete'
import { deleteOne } from '../../../api/backend/serviceApi'

const DeleteEntityModal = () => {


    const context = useContext(Context)
    const [selectedEntities, setSelectedEntities] = context.state.selectedEntities
    const entity = selectedEntities.length > 0 ? selectedEntities[0] : null

    function confirm(params) {
        context.topBar.handlers.deleteEntity('confirm')
    }

    function cancel() {
        context.topBar.handlers.deleteEntity('cancel')
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
            Удалить <b>{entity !== null ? entity.name : ''}</b> ?
        </Confirmation>
    )
}

export default DeleteEntityModal