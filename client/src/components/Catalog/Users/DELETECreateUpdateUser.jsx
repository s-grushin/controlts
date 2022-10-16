import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import useCreateUpdate from '../../../hooks/useCreateUpdate'
import useInputChange from '../../../hooks/useInputChange'
import { create, update, getOne, changePassword } from '../../../api/backend/userApi'
import Entity from '../../Entity/Entity'
import { USER_ROLES } from '../../../constants/appConstants'
import EntityContext from '../../Entity/EntityContext'
import ChangePassword from './ChangePassword'
import { useState } from 'react'

const CreateUpdateUser = ({ isUpdateMode }) => {

    const initState = {
        login: '',
        password: '',
        repeatPassword: '',
        fullName: '',
        role: 'USER',
        phoneNumber1: '',
        phoneNumber2: '',
        isActive: true
    }

    const [formData, setFormData, isLoading, saveAndCloseHandler, isSaving, error]
        = useCreateUpdate(initState, isUpdateMode, create, update, getOne)

    const [inputChangeHandler] = useInputChange(formData, setFormData)

    // password changing
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [isPasswordChanging, setIsPasswordChanging] = useState(false)

    const changePasswordHandler = async (mode = 'cancel', data) => {

        if (mode === 'cancel') {
            setShowChangePassword(false)
            return
        }

        if (!data) {
            alert('no data provided')
            return
        }

        try {
            data.id = formData.id
            setIsPasswordChanging(true)
            await changePassword(data)
            setShowChangePassword(false)
            alert('Пароль изменен')
        } catch (error) {
            alert(error.message)
        } finally {
            setIsPasswordChanging(false)
        }
    }

    const createContext = () => {

        const context = new EntityContext()
        context.state.isLoading = isLoading
        context.state.isSaving = isSaving
        context.state.error = error
        context.handlers.saveAndCloseHandler = saveAndCloseHandler

        return context
    }

    return (
        <>
            < Entity context={createContext()} >
                <Card className='mt-2'>
                    <Card.Body>
                        <Card.Title>
                            {isUpdateMode ?
                                'Редактирование пользователя'
                                :
                                'Создание нового пользователя'}
                        </Card.Title>
                        <Form>

                            {/* login */}
                            <Form.Group className="mb-3">
                                <Form.Label>Логин</Form.Label>
                                <Form.Control type="text" placeholder="Логин" size='sm' name='login'
                                    value={formData.login}
                                    onChange={inputChangeHandler}

                                />
                                < Form.Text className="text-muted">
                                    имя для входа в программу
                                </Form.Text>
                            </Form.Group>

                            {
                                isUpdateMode ?
                                    <>
                                        {/* change password */}
                                        <Form.Group className="mb-3">
                                            <Button variant='outline-primary' size='sm'
                                                onClick={() => setShowChangePassword(true)}
                                            >Изменить пароль</Button>
                                        </Form.Group>

                                        <ChangePassword show={showChangePassword}
                                            confirmHandler={changePasswordHandler}
                                            cancelHandler={() => changePasswordHandler('cancel')}
                                            isConfirming={isPasswordChanging}
                                        />
                                    </>
                                    :
                                    <>
                                        {/* password */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Пароль</Form.Label>
                                            <Form.Control type="password" placeholder="Пароль" size='sm' name='password' role='presentation'
                                                value={formData.password}
                                                onChange={inputChangeHandler}
                                                autoComplete="new-password"
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
                                    </>

                            }

                            {/* fullName */}
                            <Form.Group className="mb-3">
                                <Form.Label>ФИО</Form.Label>
                                <Form.Control type="text" placeholder="ФИО" size='sm' name='fullName'
                                    value={formData.fullName || ''}
                                    onChange={inputChangeHandler}
                                />
                                <Form.Text className="text-muted">
                                    для вывода в документы
                                </Form.Text>
                            </Form.Group>

                            {/* role */}
                            <Form.Group className="mb-3">
                                <Form.Label>Роль</Form.Label>
                                <Form.Select size="sm" name='role'
                                    defaultValue={formData.role}
                                    onChange={inputChangeHandler}>
                                    {
                                        USER_ROLES.map((role, index) => (
                                            <option key={index}>{role}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>

                            {/* phoneNumber1 */}
                            <Form.Group className="mb-3">
                                <Form.Label>Номер телефона 1</Form.Label>
                                <Form.Control type="text" placeholder="Номер телефона 1" size='sm' name='phoneNumber1'
                                    value={formData.phoneNumber1 || ''}
                                    onChange={inputChangeHandler}
                                />
                            </Form.Group>

                            {/* phoneNumber2 */}
                            <Form.Group className="mb-3">
                                <Form.Label>Номер телефона 2</Form.Label>
                                <Form.Control type="text" placeholder="Номер телефона 2" size='sm' name='phoneNumber2'
                                    value={formData.phoneNumber2 || ''}
                                    onChange={inputChangeHandler}
                                />
                            </Form.Group>

                            {/* isActive */}
                            <Form.Group className="mb-3">
                                <Form.Check label='Используется' name='isActive'
                                    defaultChecked={formData.isActive}
                                    onChange={inputChangeHandler}
                                />
                                <Form.Text className="text-muted">
                                    снять галку если необходимо отключить пользователя
                                </Form.Text>
                            </Form.Group>
                        </Form>

                    </Card.Body>
                </Card>
            </Entity >
        </>
    )

}

export default CreateUpdateUser