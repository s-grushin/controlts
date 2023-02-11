import { Stack } from 'react-bootstrap'
import AppButton from '../../AppButton'
import { PlusCircle, DashCircle, XCircleFill, Check2 } from 'react-bootstrap-icons'


const Toolbar = ({ handlers, disabledBtn, renderExtraButtons }) => {

    const { add, deleteOne, deleteAll, save } = handlers
    const { addDisabled, deleteOneDisabled, deleteAllDisabled, saveDisabled } = disabledBtn

    return (
        <Stack direction='horizontal' gap={2} className='p-1'>

            <AppButton
                variant='outline-success'
                onClick={add}
                disabled={addDisabled}
            >
                <PlusCircle />
            </AppButton>

            <AppButton
                variant='outline-danger'
                onClick={deleteOne}
                disabled={deleteOneDisabled}
            >
                <DashCircle />
            </AppButton>

            {
                deleteAll &&
                <AppButton
                    variant='outline-danger'
                    onClick={deleteAll}
                    tooltipText='Очистить все'
                    disabled={deleteAllDisabled}
                >
                    <XCircleFill />
                </AppButton>
            }


            <AppButton
                variant='outline-success'
                onClick={save}
                tooltipText='Сохранить изменения'
                disabled={saveDisabled}
            >
                <Check2 />
            </AppButton>

            {renderExtraButtons()}

        </Stack>
    )
}

Toolbar.defaultProps = {

    handlers: {
        add: null,
        deleteOne: null,
        deleteAll: null,
        save: null,
    },
    renderExtraButtons: () => { }

}

export default Toolbar