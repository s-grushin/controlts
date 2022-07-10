import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import EntityListView from '../../EntityListView/EntityListView'
import EntityListContext from '../../EntityListView/EntityListContext'
import useDelete from '../../../hooks/useDelete'
import useLoadItems from '../../../hooks/useLoadItems'
import { getAll, deleteOne } from '../../../api/backend/companyApi'


const Companies = () => {

  const [items, setItems, loading, error] = useLoadItems(getAll)
  const [selectedItems, setSelectedItems] = useState([])
  const [deleteFunc, deleting, showDeleteModal, setShowDeleteModal] = useDelete(deleteOne)

  const navigate = useNavigate()

  const createContext = () => {

    const addItem = () => {
      navigate('/catalog/companies/add')
    }

    const editItem = (id) => {
      navigate(`/catalog/companies/${id}`)
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
      { id: 2, name: 'edrpou', title: 'ЕДРПОУ' },
      { id: 3, name: 'inn', title: 'ИНН' },
    ]
    const context = new EntityListContext(columns)
    context.entities = items
    context.handlers.addEntity = addItem
    context.handlers.deleteEntity = deleteItem
    context.handlers.editEntity = editItem
    context.state.selectedEntities = selectedItems
    context.state.setSelectedEntities = setSelectedItems
    context.modals.delete.show = showDeleteModal
    context.modals.delete.isDeleting = deleting

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

export default Companies