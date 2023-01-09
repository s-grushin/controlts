import { useState, useEffect, useContext } from 'react'
import useHttp from '../hooks/useHttp'
import { Form, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ChangePassword from '../components/Catalog/Users/ChangePassword'
import useInputChange from '../hooks/useInputChange'
import BottomBar from '../components/Item/BottomBar'
import Spinner from '../components/Spinner'
import AppAlert from '../components/AppAlert'
import { AppGlobalDataContext } from '../context/AppGlobalDataProvider'

const ProfilePage = () => {

    const [fullName, setFullName] = useState('')
    const [phoneNumber1, setPhoneNumber1] = useState('')
    const [phoneNumber2, setPhoneNumber2] = useState('')

    const { request, loading, error, clearError } = useHttp()
    const { restoreAuth } = useContext(AppGlobalDataContext)

    const navigate = useNavigate()
    const inputChangeHandler = useInputChange()


    const saveHandler = async () => {
        const data = await request('/users/saveProfile', 'put', { fullName, phoneNumber1, phoneNumber2 })
        if (data) {
            restoreAuth()
            navigate('/')
        }
    }


    useEffect(() => {

        const fetchUser = async () => {
            const { user } = await request('/users/getProfile')
            setFullName(user.fullName)
            setPhoneNumber1(user.phoneNumber1)
            setPhoneNumber2(user.phoneNumber2)
        }

        fetchUser()

    }, [request])

    return (
        <Row className='mt-2'>
            <Col md='5' className='mx-auto'>
                <Card className='mt-2'>
                    <Card.Body>
                        {
                            loading ?
                                <Spinner />
                                :
                                <>
                                    <Card.Title>
                                        Профиль пользователя
                                    </Card.Title>

                                    {error && <AppAlert text={error} show={error} clear={clearError} />}

                                    <Form>

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

                                        <ChangePassword userId={1} />

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

                                    </Form>
                                    <BottomBar
                                        saveHandler={saveHandler}
                                        isSaving={loading}
                                        cancelHandler={() => navigate('/')}
                                    />
                                </>
                        }

                    </Card.Body>

                </Card>
            </Col>
        </Row>
    )
}

export default ProfilePage