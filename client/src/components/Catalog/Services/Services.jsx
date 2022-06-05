import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useLoadData } from '../../../hooks/backend.hook'
import { getAll } from '../../../api/backend/serviceApi'
import EntityView from '../../EntityView/EntityView'

const Services = () => {

  const [isLoading, services, isError, errorMesage] = useLoadData(getAll)
  const [selectedServices, setSelectedServices] = useState([])
  const navigate = useNavigate()

  const createEntityViewProps = () => {

    const addService = () => {
      navigate('/catalog/services/add')
    }

    const deleteService = () => {
      console.log('deleteService');
    }

    return {
      entities: services,
      columns: [
        { id: 1, name: 'Наименование' },
        { id: 2, name: 'Цена' }
      ],
      topBar: {
        buttons: [
          { name: 'add', text: 'Добавить', variant: 'outline-primary', handler: addService },
          { name: 'delete', text: 'Удалить', variant: 'outline-danger', handler: deleteService }
        ]
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
            <>
              <EntityView props={createEntityViewProps()} />
            </>

      }
    </>
  )
}

export default Services