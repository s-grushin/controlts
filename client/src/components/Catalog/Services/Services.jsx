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

  const createOptions = () => {

    const addEntity = () => {
      navigate('/catalog/services/add')
    }

    const openEntity = (id, event) => {
      navigate(`/catalog/services/${id}`)
    }

    return {
      entities: services,
      columns: [
        { id: 1, name: 'name', title: 'Наименование' },
        { id: 2, name: 'price', title: 'Цена' }
      ],
      topBar: {
        handlers: {
          addEntity
        }
      },
      table: {
        handlers: {
          openEntity
        }
      },
      state: {
        selectedEntities: [selectedServices, setSelectedServices]
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
            <EntityListView options={createOptions()} />
      }
    </>
  )
}

export default Services