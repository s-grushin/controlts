import React, { useState } from 'react'
import { useNavigate, use } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import useLoadList from '../../../hooks/useLoadList'
import useDelete from '../../../hooks/useDelete'
import { getAll, deleteOne } from '../../../api/backend/serviceApi'
import EntityListView from '../../EntityListView/EntityListView'
import EntityListContext from '../../EntityListView/EntityListContext'


const Services = () => {

  const [services, setServices, isLoading, error] = useLoadList(getAll)
  const [selectedServices, setSelectedServices] = useState([])
  const [deleteFunc, isDeleting, showDeleteModal, setShowDeleteModal] = useDelete(deleteOne)

  const navigate = useNavigate()

  const createContext = () => {

    const addService = () => {
      navigate('/catalog/services/add')
    }

    const editService = (id) => {
      navigate(`/catalog/services/${id}`)
    }

    const deleteService = async (mode) => {

      switch (mode) {
        case 'showModal':
          setShowDeleteModal(true)
          break;
        case 'cancel':
          setShowDeleteModal(false)
          break;
        case 'confirm':
          const id = selectedServices[0].id
          await deleteFunc(id)
          setServices(services.filter(item => item.id !== id))
          setShowDeleteModal(false)
          break;
        default:
          break;
      }
    }

    const columns = [
      { id: 1, name: 'name', title: 'Наименование' },
      { id: 2, name: 'price', title: 'Цена' }
    ]
    const context = new EntityListContext(columns)
    context.entities = services
    context.handlers.addEntity = addService
    context.handlers.deleteEntity = deleteService
    context.handlers.editEntity = editService
    context.state.selectedEntities = selectedServices
    context.state.setSelectedEntities = setSelectedServices
    context.modals.delete.show = showDeleteModal
    context.modals.delete.isDeleting = isDeleting

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

export default Services