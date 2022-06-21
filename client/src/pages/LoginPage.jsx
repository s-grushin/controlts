import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Card, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { login as loginFunc } from '../redux/user/actions'
import LoaderButton from '../components/AppButtons/LoaderButton'

const LoginPage = () => {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const dispatch = useDispatch()
  const { loading, error, userInfo } = userLogin


  function loginHandler(event) {
    event.preventDefault()
    dispatch(loginFunc(login, password))
  }

  useEffect(() => {

    if (userInfo) {
      navigate('/')
    }

  }, [userInfo])


  return (
    <Row >
      <Col className='d-flex align-items-center justify-content-center vh-100'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Вход в систему</Card.Title>
            <Form onSubmit={loginHandler}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Логин" required
                  value={login}
                  onChange={(event) => setLogin(event.target.value)}
                  autoFocus />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Пароль" autoComplete='new-password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <div className='d-flex justify-content-end'>
                <LoaderButton variant='primary' text="Войти" isLoading={loading} clickHandler={loginHandler} />
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row >
  )
}

export default LoginPage