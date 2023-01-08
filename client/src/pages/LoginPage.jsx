import React, { useState, useContext } from 'react'
import { Col, Row, Card, Form } from 'react-bootstrap'
import Button from '../components/Button'
import { AppGlobalDataContext } from '../context/AppGlobalDataProvider'

const LoginPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login, loading } = useContext(AppGlobalDataContext)

  async function loginHandler(event) {
    login(username, password)
  }

  return (
    <Row >
      <Col className='d-flex align-items-center justify-content-center vh-100'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Вход в систему</Card.Title>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Логин" required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoFocus />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Пароль" autoComplete='new-password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <div className='d-flex justify-content-end'>
                <Button variant='primary' title="Войти" loading={loading} clickHandler={loginHandler} />
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row >
  )
}

export default LoginPage