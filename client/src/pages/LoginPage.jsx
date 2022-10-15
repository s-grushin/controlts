import React, { useState, useContext } from 'react'
import { Col, Row, Card, Form } from 'react-bootstrap'
import useHttp from '../hooks/useHttp'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthProvider'

const LoginPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { request, loading, error } = useHttp()
  const auth = useContext(AuthContext)

  async function loginHandler(event) {
    const data = await request('/users/login', 'post', { login: username, password })
    auth.login(data.token, data.userInfo)
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
                <Button variant='primary' title="Войти" isLoading={loading} clickHandler={loginHandler} />
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row >
  )
}

export default LoginPage