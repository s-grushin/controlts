import React from 'react'
import { Col, Row, Card, Button, Form } from 'react-bootstrap'

const AuthPage = () => {
  return (
    <Row >
      <Col className='d-flex align-items-center justify-content-center vh-100'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Вход в систему</Card.Title>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Имя пользователя" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Пароль" />
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

export default AuthPage