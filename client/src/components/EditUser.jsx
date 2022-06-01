import React from 'react'
import { useParams, useNavigate,  } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import EntityBar from './EntityBar'

const EditUser = () => {
  const params = useParams()
  const navigate = useNavigate()

  const saveHandler = () => {
    console.log('saveHandler');
  }

  const backHandler = () => {
    navigate('/catalog/users')
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Редактирование пользователя</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <EntityBar saveHandler={saveHandler} backHandler={backHandler} />
        </Card.Body>
      </Card>
    </>
  )
}

export default EditUser