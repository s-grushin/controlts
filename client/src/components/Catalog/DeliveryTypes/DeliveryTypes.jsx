import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import useLoadItems from '../../../hooks/useLoadItems'
import useDelete from '../../../hooks/useDelete'
import { getAll, deleteOne } from '../../../api/backend/deliveryTypesApi'
import EntityListView from '../../EntityListView/EntityListView'
import EntityListContext from '../../EntityListView/EntityListContext'


const DeliveryTypes = () => {

  const [items, setItems, loading, error, currentPage, setCurrentPage, itemsCount, itemsOnPage]
    = useLoadItems(getAll)
  const [selectedItems, setSelectedItems] = useState([])
  const [deleteFunc, isDeleting, showDeleteModal, setShowDeleteModal] = useDelete(deleteOne)

  const navigate = useNavigate()

  const createContext = () => {

    const addItem = () => {
      navigate('/catalog/deliveryTypes/add')
    }

    const editItem = (id) => {
      navigate(`/catalog/deliveryTypes/${id}`)
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
      { id: 1, name: 'name', title: 'Наименование' },
    ]
    const context = new EntityListContext(columns)
    context.entities = items
    context.handlers.addEntity = addItem
    context.handlers.deleteEntity = deleteItem
    context.handlers.editEntity = editItem
    context.state.selectedEntities = selectedItems
    context.state.setSelectedEntities = setSelectedItems
    context.modals.delete.show = showDeleteModal
    context.modals.delete.isDeleting = isDeleting
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

export default DeliveryTypes