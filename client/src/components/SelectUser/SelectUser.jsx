import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import useHttp from '../../hooks/useHttp'

const SelectUser = ({ onUserSelected }) => {

    const [users, setUsers] = useState([])
    const { request, loading, error } = useHttp()

    useEffect(() => {

        const fetchUsers = async () => {
            const data = await request('/publicData/getLoginUsers')
            if (data) {
                setUsers(data)
            }
            if (error) {
                alert(error)
            }
        }

        fetchUsers()

    }, [request, error])

    const onChangeHandler = (event) => {
        if (onUserSelected) {
            onUserSelected(event.target.value)
        }
    }

    return (
        <Form.Select disabled={loading} onChange={onChangeHandler}>
            <option value=''>---Выбрать пользователя---</option>
            {
                users.map(item => (
                    <option key={item.id} value={item.username}>{item.username}</option>
                ))
            }
        </Form.Select >
    )
}

export default SelectUser