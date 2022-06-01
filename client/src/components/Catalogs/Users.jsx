import React, { useEffect, useState } from 'react'
import { Table, Spinner } from 'react-bootstrap'
import { getAll } from '../../api/userApi'
import { useApiFetch } from '../../hooks/useApiFetch'

const Users = () => {

    const [users, loading] = useApiFetch(getAll)

    return (
        <>
            {
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
                                    <tr key={user.id}>
                                        <td>{user.login}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.role}</td>
                                        <td>{user.isActive}</td>
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