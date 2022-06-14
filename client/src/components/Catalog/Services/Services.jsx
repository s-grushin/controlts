import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import useLoadList from '../../../hooks/useLoadList'
import useDelete from '../../../hooks/useDelete'
import { getAll, deleteOne } from '../../../api/backend/serviceApi'
import EntityListView from '../../EntityListView/EntityListView'


const Services = () => {

  const [services, isLoading, error] = useLoadList(getAll)
  const [selectedServices, setSelectedServices] = useState([])
  const [deleteService, isDeleting, showDeleteModal, setShowDeleteModal] = useDelete(deleteOne)

  const navigate = useNavigate()

  const createContext = () => {

    const addEntity = () => {
      navigate('/catalog/services/add')
    }

    const openEntity = (id) => {
      navigate(`/catalog/services/${id}`)
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
          await deleteService(selectedServices[0].id)
          setShowDeleteModal(false)
          setSelectedServices([])
          break;

        default:
          break;
      }
    }

    return {
      entities: services,
      columns: [
        { id: 1, name: 'name', title: 'Наименование' },
        { id: 2, name: 'price', title: 'Цена' }
      ],
      topBar: {
        handlers: {
          addEntity,
          deleteEntity,
        }
      },
      table: {
        handlers: {
          openEntity
        }
      },
      state: {
        selectedEntities: [selectedServices, setSelectedServices],
      },
      modals: {
        delete: {
          show: showDeleteModal,
          isDeleting
        }
      }
    }

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