import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useLoadData } from '../../hooks/backend.hook'
import { getAll } from '../../api/backend/serviceApi'
import EntityView from '../EntityView/EntityView'

const Services = () => {

  const [isLoading, services, isError, errorMesage] = useLoadData(getAll)
  const [selectedServices, setSelectedServices] = useState([])

  const createEntityViewProps = () => {

    const addService = () => {
      console.log('addService');
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
          { name: 'add', text: 'Добавить', handler: addService },
          { name: 'delete', text: 'Удалить', handler: deleteService }
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