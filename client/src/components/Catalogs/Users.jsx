import React, { useEffect, useState } from 'react'
import { Table, Spinner } from 'react-bootstrap'
import { getAll } from '../../api/userApi'
import { useApiFetch } from '../../hooks/useApiFetch'

const Users = () => {

    const [users, loading, error] = useApiFetch(getAll)

    const editUserHandler = (id) => {
        console.log(id);
    }

    return (
        <>
            {
                error ? '<Ошибка при получении данных с сервера>'
                    :
                    loading ?
                        <Spinner animation="border" variant="primary" />
                        :
                        < Table responsive bordered hover size='sm' >
                            < thead >
                                <tr>
                                    <th>Логин</th>
                                    <th>ФИО</th>
                                    <th>Роль</th>
                                    <th>Используется</th>
                                    <th>№ телефона 1</th>
                                    <th>№ телефона 2</th>
                                </tr >
                            </thead >
                            <tbody>
                                {
                                    users.map(user =>
                                        <tr
                                            key={user.id}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => editUserHandler(user.id)}
                                        >
                                            <td>{user.login}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.role}</td>
                                            <td>{user.isActive ? 'да' : 'нет'}</td>
                                            <td>{user.phoneNumber1}</td>
                                            <td>{user.phoneNumber2}</td>
                                        </tr>
                                    )

                                }
                            </tbody>
                        </Table >
            }
        </>)
}

export default Users