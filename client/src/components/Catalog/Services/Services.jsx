import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import useLoadList from '../../../hooks/useLoadList'
import { getAll } from '../../../api/backend/serviceApi'
import EntityListView from '../../EntityListView/EntityListView'


const Services = () => {
  
  const [services, isLoading, error] = useLoadList(getAll)
  const [selectedServices, setSelectedServices] = useState([])

  const navigate = useNavigate()

  const createContext = () => {

    const addEntity = () => {
      navigate('/catalog/services/add')
    }

    const openEntity = (id) => {
      navigate(`/catalog/services/${id}`)
    }

    const deleteEntity = (id) => {
      setShowModal(true)
    }

    const confirmDelete = () => {

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
        deleteEntity: {
          title: 'Подтвердите удаление',

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