import { useState, useMemo } from 'react'
import { Card, Form } from 'react-bootstrap'
import CreateUpdateItem from '../../Item/CreateUpdateItem'
import useInputChange from '../../../hooks/useInputChange'

const CreateUpdateCompany = ({ variant }) => {

  const [name, setName] = useState('')
  const [edrpou, setEdrpou] = useState('')
  const [inn, setInn] = useState('')

  const inputChangeHandler = useInputChange()

  const updateOptions = useMemo(() => [
    { field: 'name', setState: setName },
    { field: 'edrpou', setState: setEdrpou },
    { field: 'inn', setState: setInn },
  ], [])

  return (
    <CreateUpdateItem
      variant={variant}
      fetchUrl='/companies'
      data={{ name, edrpou, inn }}
      updateOptions={updateOptions}
    >
      <Card className='mt-2'>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Наименование компании</Form.Label>
              <Form.Control size='sm' type="text"
                onChange={e => inputChangeHandler(e, setName)}
                placeholder="Наименование компании"
                name="name"
                value={name} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ЕДРПОУ</Form.Label>
              <Form.Control size='sm' type="text"
                onChange={e => inputChangeHandler(e, setEdrpou)}
                placeholder="ЕДРПОУ"
                name="edrpou"
                value={edrpou} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ИНН</Form.Label>
              <Form.Control size='sm' type="text"
                onChange={e => inputChangeHandler(e, setInn)}
                placeholder="ИНН"
                name="inn"
                value={inn} />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </CreateUpdateItem>
  )
}

export default CreateUpdateCompany