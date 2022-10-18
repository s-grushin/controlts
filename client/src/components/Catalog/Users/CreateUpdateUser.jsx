import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Form } from 'react-bootstrap'
import Button from '../../Button'
import CreateUpdateItem from '../../Item/CreateUpdateItem'
import { USER_ROLES } from '../../../constants/appConstants'
import ChangePassword from './ChangePassword'
import useInputChange from '../../../hooks/useInputChange'

const CreateUpdateUser = ({ variant }) => {

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [selectedRole, setSelectedRole] = useState(USER_ROLES.user)
    const [phoneNumber1, setPhoneNumber1] = useState('')
    const [phoneNumber2, setPhoneNumber2] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [showChangePassword, setShowChangePassword] = useState(false)

    const inputChangeHandler = useInputChange()

    const userId = useParams().id

    const updateOptions = useMemo(() => [
        { field: 'username', setState: setUsername },
        { field: 'fullName', setState: setFullName },
        { field: 'role', setState: setSelectedRole },
        { field: 'phoneNumber1', setState: setPhoneNumber1 },
        { field: 'phoneNumber2', setState: setPhoneNumber2 },
        { field: 'isActive', setState: setIsActive },
    ], [])

    const roleOptions = Object.keys(USER_ROLES).map(key => <option key={key} value={USER_ROLES[key]}>{USER_ROLES[key]}</option>)

    return (
        <CreateUpdateItem
            variant={variant}
            fetchUrl='/users'
            data={{ username, fullName, password, role: selectedRole, phoneNumber1, phoneNumber2, isActive }}
            updateOptions={updateOptions}
        >
            <Card className='mt-2'>
                <Card.Body>
                    <Card.Title>
                        {variant === 'create' ? 'Создать пользователя' : 'Редактировать пользователя'}
                    </Card.Title>
                    <Form>

                        {/* login */}
                        <Form.Group className="mb-3">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control type="text" placeholder="Логин" size='sm' name='login'
                                value={username}
                                onChange={e => inputChangeHandler(e, setUsername)}
                            />
                            < Form.Text className="text-muted">
                                имя для входа в программу
                            </Form.Text>
                        </Form.Group>

                        {
                            variant === 'update' ?
                                <>
                                    {/* change password */}
                                    <Form.Group className="mb-3">
                                        <Button title='Изменить пароль' clickHandler={() => setShowChangePassword(true)} />
                                    </Form.Group>

                                    <ChangePassword
                                        show={showChangePassword}
                                        close={() => setShowChangePassword(false)}
                                        userId={userId}
                                    />
                                </>
                                :
                                <>
                                    {/* password */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control type="password" placeholder="Пароль" size='sm' name='password' role='presentation'
                                            value={password}
                                            onChange={e => inputChangeHandler(e, setPassword)}
                                            autoComplete="new-password"
                                        />
                                    </Form.Group>

                                    {/* repeat password */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Повтор пароля</Form.Label>
                                        <Form.Control type="password" placeholder="Повтор пароля" size='sm' name='repeatPassword'
                                            value={repeatPassword}
                                            onChange={e => inputChangeHandler(e, setRepeatPassword)}
                                        />
                                    </Form.Group>
                                </>

                        }

                        {/* fullName */}
                        <Form.Group className="mb-3">
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control type="text" placeholder="ФИО" size='sm' name='fullName'
                                value={fullName}
                                onChange={e => inputChangeHandler(e, setFullName)}
                            />
                            <Form.Text className="text-muted">
                                для вывода в документы
                            </Form.Text>
                        </Form.Group>

                        {/* role */}
                        <Form.Group className="mb-3">
                            <Form.Label>Роль</Form.Label>
                            <Form.Select size="sm" name='role'
                                defaultValue={selectedRole}
                                onChange={e => inputChangeHandler(e, setSelectedRole)}
                            >
                                {roleOptions}
                            </Form.Select>
                        </Form.Group>

                        {/* phoneNumber1 */}
                        <Form.Group className="mb-3">
                            <Form.Label>Номер телефона 1</Form.Label>
                            <Form.Control type="text" placeholder="Номер телефона 1" size='sm' name='phoneNumber1'
                                value={phoneNumber1}
                                onChange={e => inputChangeHandler(e, setPhoneNumber1)}
                            />
                        </Form.Group>

                        {/* phoneNumber2 */}
                        <Form.Group className="mb-3">
                            <Form.Label>Номер телефона 2</Form.Label>
                            <Form.Control type="text" placeholder="Номер телефона 2" size='sm' name='phoneNumber2'
                                value={phoneNumber2}
                                onChange={e => inputChangeHandler(e, setPhoneNumber2)}
                            />
                        </Form.Group>

                        {/* isActive */}
                        <Form.Group className="mb-3">
                            <Form.Check label='Используется' name='isActive'
                                defaultChecked={isActive}
                                onChange={e => inputChangeHandler(e, setIsActive)}
                            />
                            <Form.Text className="text-muted">
                                снять галку если необходимо отключить пользователя
                            </Form.Text>
                        </Form.Group>
                    </Form>

                </Card.Body>
            </Card>
        </CreateUpdateItem>
    )
}

export default CreateUpdateUser