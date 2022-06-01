import React from 'react'
import { useParams, useNavigate, } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
import EntityBar from './EntityBar'

const EditUser = () => {
  const params = useParams()
  const navigate = useNavigate()

  const saveHandler = () => {
    console.log('saveHandler');
  }

  const backHandler = () => {
    navigate('/catalog/users')
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Редактирование пользователя</Card.Title>

          {/* login */}
          <Form.Group className="mb-3">
            <Form.Label>Логин</Form.Label>
            <Form.Control type="text" placeholder="Логин" size='sm' />
            <Form.Text className="text-muted">
              имя для входа
            </Form.Text>
          </Form.Group>

          {/* fullName */}
          <Form.Group className="mb-3">
            <Form.Label>ФИО</Form.Label>
            <Form.Control type="text" placeholder="ФИО" size='sm' />
            <Form.Text className="text-muted">
              для вывода в документы
            </Form.Text>
          </Form.Group>

          {/* role */}
          <Form.Group className="mb-3">
            <Form.Label>Роль</Form.Label>
            <Form.Select size="sm">
              <option>USER</option>
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
    </>
  )
}

export default EditUser