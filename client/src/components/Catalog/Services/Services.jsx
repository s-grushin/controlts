import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useLoadData } from '../../../hooks/backend.hook'
import { getAll } from '../../../api/backend/serviceApi'
import EntityListView from '../../EntityListView/EntityListView'
import Add from '../../AppButtons/Add'

const Services = () => {

  const [isLoading, services, isError, errorMesage] = useLoadData(getAll)
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
        { id: 1, name: 'Наименование' },
        { id: 2, name: 'Цена' }
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
        isError ?
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