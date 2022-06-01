import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Spinner, Button } from 'react-bootstrap'
import { getAll } from '../../api/userApi'
import { useApiFetch } from '../../hooks/useApiFetch'

const Users = () => {

    const [users, loading, error] = useApiFetch(getAll)
    const navigate = useNavigate()

    const openUserHandler = (id) => {
        navigate(`/catalog/users/${id}`)
    }

    return (
        <>
            {
                error ? '<Ошибка при получении данных с сервера>'
                    :
                    loading ?
                        <Spinner animation="border" variant="primary" />
                        :
                        <>
                            <div className='mb-2'>
                                <Button variant="outline-secondary" size='sm'>Добавить</Button>
                            </div>
                            < Table responsive bordered hover size='sm' >
                                < thead >
                                    <tr>
                                        <th>№</th>
                                        <th>Логин</th>
                                        <th>Роль</th>
                                        <th>Используется</th>
                                    </tr >
                                </thead >
                                <tbody>
                                    {
                                        users.map((user, index) =>
                                            <tr
                                                key={user.id}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => openUserHandler(user.id)}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{user.login}</td>
                                                <td>{user.role}</td>
                                                <td>{user.isActive ? 'да' : 'нет'}</td>
                                            </tr>
                                        )

                                    }
                                </tbody>
                            </Table >
                        </>
            }
        </>)
}

export default Users