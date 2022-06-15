import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getAll, deleteOne } from '../../../api/backend/userApi'
import useDelete from '../../../hooks/useDelete'
import useLoadList from '../../../hooks/useLoadList'
import EntityListView from '../../EntityListView/EntityListView'
import EntityListContext from '../../EntityListView/EntityListContext'

const Users = () => {

    const [users, isLoading, error] = useLoadList(getAll)
    const [deleteUser, isDeleting, showDeleteModal, setShowDeleteModal] = useDelete(deleteOne)

    const [selectedUsers, setSelectedUsers] = useState([])
    const navigate = useNavigate()






    const createContext = () => {

        const addEntity = () => {
            navigate('/catalog/users/add')
        }

        const openEntity = (id) => {
            navigate(`/catalog/users/${id}`)
        }

        const deleteEntity = async (mode) => {

            switch (mode) {
                case 'showModal':
                    setShowDeleteModal(true)
                    break;
                case 'cancel':
                    setShowDeleteModal(false)
                    break;
                case 'confirm':
                    //await deleteUser(selectedUsers[0].id)
                    setShowDeleteModal(false)
                    setSelectedUsers([])
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
        context.topBar.handlers.addEntity = addEntity
        context.topBar.handlers.deleteEntity = deleteEntity
        context.table.handlers.openEntity = openEntity
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