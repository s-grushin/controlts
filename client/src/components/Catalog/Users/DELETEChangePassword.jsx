import { useState } from 'react'
import { Form } from 'react-bootstrap'
import useHttp from '../../../hooks/useHttp'
import useInputChange from '../../../hooks/useInputChange'
import ConfirmModal from '../../ConfirmModal'
import AppAlert from '../../AppAlert'


const ChangePassword = ({ show, close, userId }) => {

    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const inputChange = useInputChange()

    const { request, loading, error, clearError } = useHttp()

    const closeForm = () => {
        setPassword('')
        setRepeatPassword('')
        clearError()
        close()
    }

    const saveHandler = async (action) => {
        if (action === 'cancel') {
            closeForm()
        }

        if (action === 'ok') {
            const res = await request('/users/changePassword', 'put', { id: userId, password, repeatPassword })
            if (res) {
                closeForm()
            }
        }
    }

    return (
        <ConfirmModal
            show={show}
            handleClose={saveHandler}
            loading={loading}
            title='Изменение пароля'
        >
            <Form autoComplete="off">
                <AppAlert text={error} show={!!error} clear={clearError} />
                {/* password */}
                <Form.Group className="mb-3">
                    <Form.Label>Новый пароль</Form.Label>
                    <Form.Control type="password" placeholder="Новый пароль" size='sm' name='password'
                        value={password}
                        onChange={(e) => inputChange(e, setPassword)}
                    />
                </Form.Group>

                {/* repeat password */}
                <Form.Group className="mb-3">
                    <Form.Label>Повтор пароля</Form.Label>
                    <Form.Control type="password" placeholder="Повтор пароля" size='sm' name='repeatPassword'
                        value={repeatPassword}
                        onChange={(e) => inputChange(e, setRepeatPassword)}
                    />
                </Form.Group>
            </Form>
        </ConfirmModal>

    )
}

export default ChangePassword