import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getAll, deleteOne } from '../../../api/backend/userApi'
import useDelete from '../../../hooks/useDelete'
import useLoadList from '../../../hooks/useLoadItems'
import EntityListView from '../../EntityListView/EntityListView'
import EntityListContext from '../../EntityListView/EntityListContext'

const Users = () => {

    const [users, setUsers, isLoading, error] = useLoadList(getAll)
    const [deleteFunc, isDeleting, showDeleteModal, setShowDeleteModal] = useDelete(deleteOne)

    const [selectedUsers, setSelectedUsers] = useState([])
    const navigate = useNavigate()

    const createContext = () => {

        const addUser = () => {
            navigate('/catalog/users/add')
        }

        const editUser = (id) => {
            navigate(`/catalog/users/${id}`)
        }

        const deleteUser = async (mode) => {

            switch (mode) {
                case 'showModal':
                    setShowDeleteModal(true)
                    break;
                case 'cancel':
                    setShowDeleteModal(false)
                    break;
                case 'confirm':
                    const id = selectedUsers[0].id
                    await deleteFunc(id)
                    setUsers(users.filter(item => item.id !== id))
                    setShowDeleteModal(false)
                    break;
                default:
                    break;
            }

        }

        const columns = [
            { id: 1, name: 'login', title: 'Логин' },
            { id: 2, name: 'role', title: 'Роль' },
            { id: 3, name: 'isActive', title: 'Используется' }]

        const context = new EntityListContext(columns)
        context.entities = users
        context.titlePropName = 'login'
        context.handlers.addEntity = addUser
        context.handlers.deleteEntity = deleteUser
        context.handlers.editEntity = editUser
        context.state.selectedEntities = selectedUsers
        context.state.setSelectedEntities = setSelectedUsers
        context.modals.delete.isDeleting = isDeleting
        context.modals.delete.show = showDeleteModal

        return context

    }


    return (
        <>
            {
                error ?
                    <div>{error}</div>
                    :
                    isLoading ?
                        <Spinner animation="border" variant="primary" />
                        :
                        <>
                            <EntityListView context={createContext()} />

                        </>
            }
        </>
    )
}

export default Users