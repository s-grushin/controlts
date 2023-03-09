import React, { useState, useContext } from 'react'
import { Col, Row, Card, Form } from 'react-bootstrap'
import AppAlert from '../components/AppAlert'
import Button from '../components/Button'
import SelectUser from '../components/SelectUser/SelectUser'
import { AppGlobalDataContext } from '../context/AppGlobalDataProvider'

const LoginPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login, loading, error, clearError, requestName } = useContext(AppGlobalDataContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <Row >
      <Col className='d-flex align-items-center justify-content-center vh-100'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <p>
              {requestName === 'login' && error && <AppAlert show={error} text={error} clear={clearError} />}
            </p>
            <Card.Title>Вход в систему</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <SelectUser onUserSelected={(username) => setUsername(username)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Пароль" autoComplete='new-password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <div className='d-flex justify-content-end'>
                <Button type='submit' variant='primary' title="Войти" loading={loading} />
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row >
  )
}

export default LoginPage