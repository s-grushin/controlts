import React from 'react'
import { Spinner, Button, Table } from 'react-bootstrap'
import { useLoadData } from '../../hooks/backend.hook'
import { getAll } from '../../api/backend/serviceApi'
import EntityView from '../EntityView/EntityView'

const Services = () => {

  const [isLoading, services, isError, errorMesage] = useLoadData(getAll)

  const columns = [
    { id: 1, name: 'Наименование' },
    { id: 2, name: 'Цена' }
  ]

  const getActions = () => {

    const addService = () => {
      console.log('addService');
    }

    return [
      { name: 'add', text: 'Добавить', handler: addService }
    ]

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
              <EntityView entities={services} columns={columns} actions={getActions()} />
            </>

      }
    </>
  )
}

export default Services