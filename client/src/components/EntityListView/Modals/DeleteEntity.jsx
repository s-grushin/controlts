import React from 'react'
import Confirmation from '../../Modals/Confirmation'
import { useContext } from 'react'
import Context from '../Context'

const DeleteEntity = () => {

    const [show, setShow] = useState(false)

    const context = useContext(Context)
    console.log(context);

    function confirm(params) {
        setShow(false)
    }

    return (
        <Confirmation
            title='Подтвердите удаление'
            show={show}
            confirmHandler={confirm}
        >
            Удалить <b>{context.state.selectedEntities[0].length > 0 ? context.state.selectedEntities[0].name : ''}</b> ?
        </Confirmation>
    )
}

export default DeleteEntity