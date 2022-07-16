import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getAll, deleteOne } from '../../../api/backend/userApi'
import useDelete from '../../../hooks/useDelete'
import useLoadItems from '../../../hooks/useLoadItems'
import EntityListView from '../../EntityListView/EntityListView'
import EntityListContext from '../../EntityListView/EntityListContext'

const Users = () => {

    const [items, setItems, loading, error, currentPage, setCurrentPage, itemsCount, itemsOnPage]
        = useLoadItems(getAll)
    const [deleteFunc, isDeleting, showDeleteModal, setShowDeleteModal] = useDelete(deleteOne)

    const [selectedItems, setSelectedItems] = useState([])
    const navigate = useNavigate()

    const createContext = () => {

        const addItem = () => {
            navigate('/catalog/users/add')
        }

        const editItem = (id) => {
            navigate(`/catalog/users/${id}`)
        }

        const deleteItem = async (mode) => {

            switch (mode) {
                case 'showModal':
                    setShowDeleteModal(true)
                    break;
                case 'cancel':
                    setShowDeleteModal(false)
                    break;
                case 'confirm':
                    const id = selectedItems[0].id
                    await deleteFunc(id)
                    setItems(items.filter(item => item.id !== id))
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
        context.entities = items
        context.titlePropName = 'login'
        context.handlers.addEntity = addItem
        context.handlers.deleteEntity = deleteItem
        context.handlers.editEntity = editItem
        context.state.selectedEntities = selectedItems
        context.state.setSelectedEntities = setSelectedItems
        context.modals.delete.isDeleting = isDeleting
        context.modals.delete.show = showDeleteModal
        context.pagination.itemsQtyAll = itemsCount
        context.pagination.itemsQtyOnPage = itemsOnPage
        context.pagination.currentPage = currentPage
        context.pagination.setCurrentPage = setCurrentPage

        return context

    }


    return (
        <>
            {
                error ?
                    <div>{error}</div>
                    :
                    loading ?
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