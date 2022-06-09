import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useLoadData } from '../../../hooks/backend.hook'
import { getAll } from '../../../api/backend/serviceApi'
import EntityListView from '../../EntityListView/EntityListView'

const Services = () => {

  const [services, isLoading, errorMesage] = useLoadData(getAll)
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
        errorMesage ?
          <div>{errorMesage}</div>
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