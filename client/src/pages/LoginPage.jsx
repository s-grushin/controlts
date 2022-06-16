import React from 'react'
import { Col, Row, Card, Button, Form } from 'react-bootstrap'

const LoginPage = () => {

  function loginHandler(event) {
    event.preventDefault()

  }

  return (
    <Row >
      <Col className='d-flex align-items-center justify-content-center vh-100'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Вход в систему</Card.Title>
            <Form onSubmit={loginHandler}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Имя пользователя" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Пароль" autoComplete='new-password' />
              </Form.Group>

              <div className='d-flex justify-content-end'>
                <Button className="mb-3" variant="primary" type="submit">Войти</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row >
  )
}

export default LoginPage