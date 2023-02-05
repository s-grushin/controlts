import { Stack } from 'react-bootstrap'
import AppButton from '../../AppButton'
import { PlusCircle, DashCircle, XCircleFill } from 'react-bootstrap-icons'
import useAppTable from '../useAppTable'
import { Row } from '../Table/classes'

const getPrevId = (items, selectedId) => {
    const index = items.indexOf(items.find(item => item.id === selectedId))
    const prevIndex = index - 1
    if (prevIndex < 0) {
        return null
    } else {
        return items[prevIndex].id
    }
}

const Topbar = () => {

    const { contextValue } = useAppTable()
    const { dispatch, state } = contextValue

    const deleteHandler = () => {
        dispatch({ type: 'deleteItem', payload: state.selectedId })
        dispatch({ type: 'setSelectedItem', payload: getPrevId(state.items, state.selectedId) })
    }

    const clearItemsHandlers = () => {
        dispatch({ type: 'clearItems' })
        dispatch({ type: 'setSelectedItem', payload: null })

    }

    return (
        <Stack direction='horizontal' gap={2} className='p-1'>
            <AppButton variant='outline-success'
                onClick={() => dispatch({ type: 'addItem', payload: Row.getEmptyRow(state.columnsQty) })}
            >
                <PlusCircle />
            </AppButton>
            <AppButton variant='outline-danger' onClick={deleteHandler} disabled={!state.selectedId}>
                <DashCircle />
            </AppButton>

            <AppButton variant='outline-danger' onClick={clearItemsHandlers} tooltipText='Очистить все'>
                <XCircleFill />
            </AppButton>

        </Stack>
    )
}

export default Topbar