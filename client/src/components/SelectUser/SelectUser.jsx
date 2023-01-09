import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import useHttp from '../../hooks/useHttp'

const SelectUser = ({ onUserSelected }) => {

    const [users, setUsers] = useState([])
    const { request, loading, error } = useHttp()

    useEffect(() => {

        const fetchUsers = async () => {
            const data = await request('/users?active=true')
            console.log(data);
        }

        fetchUsers()

    }, [])


    return (
        <Form.Select aria-label="Default select example">
            <option>---Выбрать пользователя---</option>
            {
                users.map(item => (
                    <option value={item.id}>{item.username}</option>
                ))
            }
        </Form.Select >
    )
}

export default SelectUser