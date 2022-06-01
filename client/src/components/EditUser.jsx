import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, } from 'react-router-dom'
import { Card, Form, Spinner } from 'react-bootstrap'
import EntityBar from './EntityBar'
import { useApiFetch } from '../hooks/useApiFetch'
import { getOne } from '../api/userApi'
import { USER_ROLES } from '../constants/appConstants'


const EditUser = () => {
  const [user, setUser] = useState({
    login: '',
    fullName: '',
    role: '',
    phoneNumber1: '',
    phoneNumber2: '',
    isActive: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {

    const response = getOne(id)
      .then(data => {
        setUser(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))

  }, [])

  const onChangeHandler = (event) => {
    const updatedUser = { ...user }
    updatedUser[event.target.name] = event.target.value
    setUser(updatedUser)
  }


  const saveHandler = () => {
    console.log(user);
  }

  const backHandler = () => {
    navigate('/catalog/users')
  }

  return (
    <>
      {
        error ? '<Ошибка при получении данных с сервера>'
          :
          loading ?
            <Spinner animation="border" variant="primary" />
            :
            <Card>
              <Card.Body>
                <Card.Title>Редактирование пользователя</Card.Title>

                {/* login */}
                <Form.Group className="mb-3">
                  <Form.Label>Логин</Form.Label>
                  <Form.Control type="text" placeholder="Логин" size='sm' name='login'
                    value={user.login}
                    onChange={onChangeHandler}
                  />
                  < Form.Text className="text-muted">
                    имя для входа
                  </Form.Text>
                </Form.Group>

                {/* fullName */}
                <Form.Group className="mb-3">
                  <Form.Label>ФИО</Form.Label>
                  <Form.Control type="text" placeholder="ФИО" size='sm' name='fullName'
                    value={user.fullName || ''}
                    onChange={onChangeHandler}
                  />
                  <Form.Text className="text-muted">
                    для вывода в документы
                  </Form.Text>
                </Form.Group>

                {/* role */}
                <Form.Group className="mb-3">
                  <Form.Label>Роль</Form.Label>
                  <Form.Select size="sm" name='role'
                    defaultValue={user.role}
                    onChange={onChangeHandler}>
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
                  <Form.Control type="text" placeholder="Номер телефона 1" size='sm' />
                </Form.Group>

                {/* phoneNumber2 */}
                <Form.Group className="mb-3">
                  <Form.Label>Номер телефона 2</Form.Label>
                  <Form.Control type="text" placeholder="Номер телефона 2" size='sm' />
                </Form.Group>

                {/* isActive */}
                <Form.Group className="mb-3">
                  <Form.Check label='Используется' />
                  <Form.Text className="text-muted">
                    снять галку если необходимо отключить пользователя
                  </Form.Text>
                </Form.Group>

                <EntityBar saveHandler={saveHandler} backHandler={backHandler} />
              </Card.Body>
            </Card>
      }
    </>
  )
}

export default EditUser