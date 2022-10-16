import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import useInputChange from '../../../hooks/DELETEuseInputChange'
import Confirmation from '../../Modals/Confirmation'

const ChangePassword = ({ show, cancelHandler, confirmHandler, isConfirming }) => {

    const [formData, setFormData] = useState({ password: '', repeatPassword: '' })
    const [inputChangeHandler] = useInputChange(formData, setFormData)

    return (
        <Confirmation
            title='Изменение пароля'
            show={show}
            confirmHandler={() => confirmHandler('confirm', formData)}
            cancelHandler={cancelHandler}
            isConfirming={isConfirming}
        >
            <Form autoComplete="off">
                {/* password */}
                <Form.Group className="mb-3">
                    <Form.Label>Новый пароль</Form.Label>
                    <Form.Control type="password" placeholder="Новый пароль" size='sm' name='password'
                        value={formData.password}
                        onChange={inputChangeHandler}
                    />
                </Form.Group>

                {/* repeat password */}
                <Form.Group className="mb-3">
                    <Form.Label>Повтор пароля</Form.Label>
                    <Form.Control type="password" placeholder="Повтор пароля" size='sm' name='repeatPassword'
                        value={formData.repeatPassword}
                        onChange={inputChangeHandler}
                    />
                </Form.Group>
            </Form>

        </Confirmation>
    )
}

export default ChangePassword